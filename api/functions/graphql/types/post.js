const {
    intArg,
    objectType,
    extendType,
    nonNull,
    interfaceType,
    unionType,
    stringArg,
    enumType,
    arg,
    inputObjectType,
} = require('nexus');
const { paginationArgs } = require('./helpers');
const { prisma } = require('../../../prisma');
const { getUserByPubKey } = require('../../../auth/utils/helperFuncs');
const { ApolloError } = require('apollo-server-lambda');
const { marked } = require('marked');


const POST_TYPE = enumType({
    name: 'POST_TYPE',
    members: ['Story', 'Bounty', 'Question'],
});

const asType = type => (obj) => {
    if (Array.isArray(obj)) return obj.map(o => ({ ...o, type }))
    return { ...obj, type }
}

const asStoryType = asType('Story')
const asQuestionType = asType('Question')
const asBountyType = asType('Bounty')


const Topic = objectType({
    name: 'Topic',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('icon');
    }
})

const Author = objectType({
    name: 'Author',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.string('avatar');
        t.nonNull.date('join_date');
    }
})


const allTopics = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('allTopics', {
            type: "Topic",
            resolve: () => {
                return prisma.topic.findMany({

                });
            }
        })
    }
})


const popularTopics = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('popularTopics', {
            type: "Topic",
            resolve: () => {
                return prisma.topic.findMany({
                    take: 6,
                    orderBy: {
                        stories: {
                            _count: 'desc'
                        }
                    },
                });
            }
        })
    }
})

const PostBase = interfaceType({
    name: 'PostBase',
    resolveType(item) {
        return item.type
    },
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.date('createdAt');
        t.nonNull.string('body');
        t.nonNull.string('excerpt');
        t.nonNull.int('votes_count');
    },
})

const Story = objectType({
    name: 'Story',
    definition(t) {
        t.implements('PostBase');
        t.nonNull.string('type', {
            resolve: () => t.typeName
        });
        t.nonNull.string('cover_image');
        t.nonNull.list.nonNull.field('comments', {
            type: "PostComment",
            resolve: (parent) => prisma.story.findUnique({ where: { id: parent.id } }).comments()
        });
        t.nonNull.list.nonNull.field('tags', {
            type: "Tag",
            resolve: (parent) => prisma.story.findUnique({ where: { id: parent.id } }).tags()
        });
        t.nonNull.int('comments_count', {
            resolve: async (parent) => {
                const post = await prisma.story.findUnique({
                    where: { id: parent.id },
                    include: {
                        _count: {
                            select: {
                                comments: true
                            }
                        }
                    }
                })
                return post._count.comments;
            }
        });
        t.nonNull.field('topic', {
            type: "Topic",
            resolve: parent => {
                return prisma.story.findUnique({
                    where: { id: parent.id }
                }).topic()
            }
        })
        t.nonNull.field('author', {
            type: "Author",
            resolve: (parent) =>
                prisma.story.findUnique({ where: { id: parent.id } }).user()

        });

    },
})

const StoryInputType = inputObjectType({
    name: 'StoryInputType',
    definition(t) {
        t.int('id');
        t.nonNull.string('title');
        t.nonNull.string('body');
        t.nonNull.string('cover_image');
        t.nonNull.list.nonNull.string('tags');
        t.nonNull.int('topicId');
    }
})
const createStory = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createStory', {
            type: 'Story',
            args: { data: StoryInputType },
            async resolve(_root, args, ctx) {
                const { id, title, body, cover_image, tags, topicId } = args.data;
                const user = await getUserByPubKey(ctx.userPubKey);

                // Do some validation
                if (!user)
                    throw new ApolloError("Not Authenticated");


                if (id) {
                    const oldPost = await prisma.story.findFirst({
                        where: { id },
                        select: {
                            user_id: true
                        }
                    })
                    if (user.id !== oldPost.user_id)
                        throw new ApolloError("Not post author")
                }
                // TODO: validate post data


                // Preprocess & insert
                const htmlBody = marked.parse(body);
                const excerpt = htmlBody.replace(/<[^>]+>/g, '').slice(0, 120);

                if (id)
                    return prisma.story.update({
                        where: { id },
                        data: {
                            title,
                            body,
                            cover_image,
                            excerpt,
                            tags: {
                                connectOrCreate:
                                    tags.map(tag => {
                                        tag = tag.toLowerCase().trim();
                                        return {
                                            where: {
                                                title: tag,
                                            },
                                            create: {
                                                title: tag
                                            }
                                        }
                                    })
                            },
                            topic: {
                                connect: {
                                    id: topicId
                                }
                            },
                        }
                    })


                return prisma.story.create({
                    data: {
                        title,
                        body,
                        cover_image,
                        excerpt,
                        tags: {
                            connectOrCreate:
                                tags.map(tag => {
                                    tag = tag.toLowerCase().trim();
                                    return {
                                        where: {
                                            title: tag,
                                        },
                                        create: {
                                            title: tag
                                        }
                                    }
                                })
                        },
                        topic: {
                            connect: {
                                id: topicId
                            }
                        },
                        user: {
                            connect: {
                                id: user.id,
                            }
                        }
                    }
                })
            }
        })
    },
})

const deleteStory = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('deleteStory', {
            type: 'Story',
            args: { id: nonNull(intArg()) },
            async resolve(_root, args, ctx) {
                const { id } = args;
                const user = await getUserByPubKey(ctx.userPubKey);
                // Do some validation
                if (!user)
                    throw new ApolloError("Not Authenticated");


                const oldPost = await prisma.story.findFirst({
                    where: { id },
                    select: {
                        user_id: true
                    }
                })
                if (user.id !== oldPost.user_id)
                    throw new ApolloError("Not post author")

                return prisma.story.delete({
                    where: {
                        id
                    }
                })
            }
        })
    },
})

const BountyApplication = objectType({
    name: 'BountyApplication',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('date');
        t.nonNull.string('workplan');
        t.nonNull.field('author', {
            type: "Author"
        });
    }
})

const Bounty = objectType({
    name: 'Bounty',
    definition(t) {
        t.implements('PostBase');
        t.nonNull.string('type', {
            resolve: () => 'Bounty'
        });
        t.nonNull.string('cover_image');
        t.nonNull.string('deadline');
        t.nonNull.int('reward_amount');
        t.nonNull.int('applicants_count');
        t.nonNull.list.nonNull.field('applications', {
            type: "BountyApplication"
        });
        t.nonNull.field('author', {
            type: "Author",
            resolve: (parent) => {
                return prisma.bounty.findUnique({ where: { id: parent.id } }).user();
            }
        });

        t.nonNull.list.nonNull.field('tags', {
            type: "Tag",
            resolve: (parent) => []
        });
    },
})

const Question = objectType({
    name: 'Question',
    definition(t) {
        t.implements('PostBase');
        t.nonNull.string('type', {
            resolve: () => 'Question',

        });

        t.nonNull.list.nonNull.field('tags', {
            type: "Tag",
            resolve: (parent) => prisma.question.findUnique({ where: { id: parent.id } }).tags()
        });

        t.nonNull.int('answers_count');
        t.nonNull.list.nonNull.field('comments', {
            type: "PostComment",
            resolve: (parent) => {
                return prisma.question.findUnique({ where: { id: parent.id } }).comments();
            }
        });

        t.nonNull.field('author', {
            type: "Author",
            resolve: (parent) => {
                return prisma.question.findUnique({ where: { id: parent.id } }).user();
            }
        });
    },
})

const PostComment = objectType({
    name: 'PostComment',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.date('createdAt');
        t.nonNull.string('body');
        t.nonNull.field('author', {
            type: "Author"
        });
        t.int('parentId');
        t.nonNull.int('votes_count');
    }
})

const Post = unionType({
    name: 'Post',
    definition(t) {
        t.members('Story', 'Bounty', 'Question')
    },
    resolveType: (item) => {
        return item.type
    },
})


const getFeed = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getFeed', {
            type: "Post",
            args: {
                ...paginationArgs({ take: 10 }),
                sortBy: stringArg(), // all, popular, trending, newest
                topic: intArg({
                    default: 0
                })
            },
            resolve(_, { take, skip, topic, sortBy, }) {


                let orderBy = { createdAt: "desc" };

                if (sortBy === 'popular')
                    orderBy = { votes_count: 'desc' };
                else if (sortBy === 'newest')
                    orderBy = { createdAt: "desc" };

                return prisma.story.findMany({
                    orderBy: orderBy,
                    where: {
                        topic_id: topic ? topic : undefined,
                    },
                    skip,
                    take,
                }).then(asStoryType)
            }
        })
    }
})


const getTrendingPosts = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getTrendingPosts', {
            type: "Post",
            args: {
            },
            resolve() {
                const now = new Date();
                const lastWeekDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
                return prisma.story.findMany({
                    where: {
                        createdAt: {
                            gte: lastWeekDate
                        }
                    },
                    orderBy: { votes_count: 'desc' },
                    take: 5,
                }).then(asStoryType)
            }
        })
    }
})


const getPostById = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field('getPostById', {
            type: "Post",
            args: {
                id: nonNull(intArg()),
                type: arg({
                    type: nonNull('POST_TYPE')
                })
            },
            resolve(_, { id, type }) {
                if (type === 'Story')
                    return prisma.story.findUnique({
                        where: { id }
                    }).then(asStoryType)

                if (type === 'Question')
                    return prisma.question.findUnique({
                        where: { id }
                    }).then(asQuestionType)
                return null
            }
        })
    }
})




module.exports = {
    // Types
    POST_TYPE,
    Author,
    Topic,
    PostBase,
    BountyApplication,
    Bounty,
    Story,
    StoryInputType,
    Question,
    PostComment,
    Post,
    // Queries
    allTopics,
    popularTopics,
    getFeed,
    getPostById,
    getTrendingPosts,

    // Mutations
    createStory,
    deleteStory,
}