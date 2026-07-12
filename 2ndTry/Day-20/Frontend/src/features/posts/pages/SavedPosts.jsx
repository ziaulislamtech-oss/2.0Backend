import React from 'react'
import usePost from '../hook/usePost'
import { useEffect } from 'react'
import Post from '../components/Post'
import FeedSkeleton from '../components/FeedSkeleton'

const SavedPosts = () => {

    const { savedPostFeed, handleGetSavedPosts ,loading} = usePost()

    console.log('saved feed', savedPostFeed)

    useEffect(() => {

        handleGetSavedPosts()

    }, [])

    if (loading) {
    return (
        <div className="min-h-screen bg-[#0C1014] py-10">
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">
                    Saved Posts
                </h1>

                <FeedSkeleton />
            </div>
        </div>
    );
}

    return (
        <div className="min-h-screen bg-[#0C1014] py-10">
            <div className="max-w-xl mx-auto">

                <h1 className="text-3xl font-bold text-white mb-8">
                    Saved Posts
                </h1>

                <div className="space-y-6">
                   
                    {
                        savedPostFeed.length === 0 ? (
                            <div className="text-center text-gray-400 mt-20">
                                <h2 className="text-2xl font-semibold">
                                    No Saved Posts
                                </h2>

                                <p className="mt-2">
                                    Save posts from your feed to view them here.
                                </p>
                            </div>
                        ) : (
                            savedPostFeed.map(post => (
                                <Post
                                    key={post._id}
                                    post={post}
                                />
                            ))
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default SavedPosts
