import Header from "src/features/Posts/Components/PostCard/Header/Header"
import { marked } from 'marked';
import styles from '../../PostDetailsPage/Components/PageContent/styles.module.scss'
import Badge from "src/Components/Badge/Badge";
import { Post } from "src/graphql";


interface Props {
    post: Pick<Post,
        | 'title'
        | 'createdAt'
        | 'body'
        | 'author'
    > & {
        tags: Array<{ title: string }>
        cover_image?: string | File
    }
}

export default function PreviewPostContent({ post }: Props) {

    let coverImg: string;
    if (!post.cover_image)
        coverImg = "";
    else if (typeof post.cover_image === 'string')
        coverImg = post.cover_image;
    else
        coverImg = URL.createObjectURL(post.cover_image);


    return (
        <>
            <div id="content" className="bg-white p-32 border rounded-16">
                {coverImg &&
                    <img src={coverImg}
                        className='w-full h-[120px] md:h-[240px] object-cover rounded-12 mb-16'
                        alt="" />}
                <div className="flex flex-col gap-24">
                    <Header size="lg" showTimeAgo={false} author={post.author} date={post.createdAt} />
                    <h1 className="text-h2 font-bolder">{post.title}</h1>
                    {post.tags.length > 0 && <div className="flex gap-8">
                        {post.tags.map((tag, idx) => <Badge key={idx} size='sm'>
                            {tag.title}
                        </Badge>)}
                    </div>}
                </div>

                <div className={`mt-42 ${styles.body}`} dangerouslySetInnerHTML={{ __html: marked.parse(post.body, {}) }}>
                </div>
            </div>
            {/* <div id="comments" className="mt-10 comments_col">
                <CommentsSection comments={story.comments} />
            </div> */}
        </>
    )
}
