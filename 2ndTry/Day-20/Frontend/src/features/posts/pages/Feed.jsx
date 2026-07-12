import React, { useEffect } from "react";
import Post from "../components/Post";
import usePost from "../hook/usePost";
import FeedSkeleton from "../components/FeedSkeleton";
import StoryBar from "../../users/components/StoryBar";
import SuggestedUsers from "../../users/components/SuggestedUsers";

const Feed = () => {

  const {
    handleGetFeed,
    feed,
    loading,
    handleToggleLike,
    handleToggleSavePost
  } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  return (
    <div className="min-h-screen bg-[#0C1014] px-3 sm:px-5 lg:px-8 py-5">

      <div className="mx-auto flex max-w-7xl gap-8">

        {/* Feed */}
        <div className="flex-1 max-w-xl">

          <StoryBar />

          <div className="mt-6 space-y-6">

            {loading ? (
              <FeedSkeleton />
            ) : (
              feed.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  toggleLike={handleToggleLike}
                  toggleSavePost={handleToggleSavePost}
                />
              ))
            )}

          </div>

        </div>

        {/* Suggested Users */}
        <aside className="hidden xl:block w-80 ml-20 shrink-0 sticky top-8 h-fit">

          <SuggestedUsers />

        </aside>

      </div>

    </div>
  );
};

export default Feed;