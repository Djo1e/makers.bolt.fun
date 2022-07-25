
import { useUpdateEffect } from '@react-hookz/web'
import { useState } from 'react'
import { useFeedQuery } from 'src/graphql'
import { useAppSelector, useInfiniteQuery, usePreload } from 'src/utils/hooks'
import PostsList from '../../Components/PostsList/PostsList'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import PopularTagsFilter, { FilterTag } from './PopularTagsFilter/PopularTagsFilter'
import SortBy from './SortBy/SortBy'
import styles from './styles.module.scss'
import { Helmet } from "react-helmet";
import Button from 'src/Components/Button/Button'
import { FaDiscord } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { capitalize } from 'src/utils/helperFunctions'


export default function FeedPage() {

    const [sortByFilter, setSortByFilter] = useState<string | null>('recent')
    const [tagFilter, setTagFilter] = useState<FilterTag | null>(null)


    const feedQuery = useFeedQuery({
        variables: {
            take: 10,
            skip: 0,
            sortBy: sortByFilter,
            tag: tagFilter?.id ?? null
        },
    })
    const { fetchMore, isFetchingMore, variablesChanged } = useInfiniteQuery(feedQuery, 'getFeed')
    useUpdateEffect(variablesChanged, [sortByFilter, tagFilter]);

    usePreload('PostPage');

    const { navHeight, isLoggedIn } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight,
        isLoggedIn: Boolean(state.user.me),
    }));


    return (
        <>
            <Helmet>
                <title>{`Bolt.Fun Stories`}</title>
                <meta property="og:title" content={`Bolt.Fun Stories`} />
            </Helmet>
            <div
                className={`page-container pt-16 w-full ${styles.grid}`}
            >
                <div id="title">
                    {tagFilter && <p className="text-body6 text-gray-500 font-medium mb-8">
                        <span className='cursor-pointer' onClick={() => setTagFilter(null)}>Stories </span>
                        <FiArrowRight />
                        <span> {tagFilter.title}</span>
                    </p>}
                    <h1 className="text-h2 font-bolder">{
                        tagFilter ?
                            <>{tagFilter.icon} {capitalize(tagFilter.title)}</>
                            :
                            "Stories ✍🏼"
                    }</h1>
                </div>
                <div id="sort-by">
                    <SortBy
                        filterChanged={setSortByFilter}
                    />
                </div>
                <div id="content">
                    <PostsList
                        isLoading={feedQuery.loading}
                        items={feedQuery.data?.getFeed}
                        isFetching={isFetchingMore}
                        onReachedBottom={fetchMore}
                    />
                </div>
                <aside id='categories' className='no-scrollbar'>
                    <div className="sticky md:overflow-y-scroll"
                        style={{
                            top: `${navHeight + 16}px`,
                            maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        }}>
                        <Button
                            href='/blog/create-post'
                            color='primary'
                            fullWidth
                        >
                            Write a story
                        </Button>
                        <div className="my-24"></div>
                        <div className="my-24"></div>
                        <PopularTagsFilter
                            value={tagFilter}
                            onChange={setTagFilter as any}
                        />

                    </div>
                </aside>
                <aside id='side' className='no-scrollbar'>
                    <div className="sticky flex flex-col gap-24"
                        style={{
                            top: `${navHeight + 16}px`,
                            maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                            overflowY: "scroll",
                        }}>
                        <TrendingCard />
                        <div className='min-h-[300px] text-white flex flex-col justify-end p-24 rounded-12 relative overflow-hidden'
                            style={{
                                backgroundImage: "url(/assets/images/stw2.jfif)"
                            }}
                        >
                            <div className="absolute bg-black inset-0 opacity-10"></div>
                            <div className="relative flex flex-col gap-24">
                                <div className="flex flex-col gap-8">
                                    <p className="text-body1 font-bolder">Shock the Web 2 ⚡️</p>
                                    <p className="text-body3 font-medium">16th - 18th June, 2022</p>
                                </div>
                                <Button
                                    color='white'
                                    fullWidth
                                    href='https://discord.gg/HFqtxavb7x'
                                    newTab
                                >
                                    <FaDiscord className='scale-125 mr-8' /> <span className="align-middle">Join in Discord</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}
