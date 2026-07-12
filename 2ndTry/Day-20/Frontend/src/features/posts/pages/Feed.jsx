import React, { useEffect } from "react";
import Post from "../components/Post";
import usePost from "../hook/usePost";
import FeedSkeleton from "../components/FeedSkeleton";

import NewPostButton from "../components/NewPostButton";
import StoryBar from "../../users/components/StoryBar";

const Feed = () => {
  const { handleGetFeed, feed, loading,handleLikePost,handleUnlikePost,handleToggleLike,handleToggleSavePost,handleCreatePost  } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  return (
  <div className="min-h-screen bg-[#0C1014] flex flex-col  ">

    {/* Story Bar */}  

    {/* Feed */}
    <main className="  ml-10 py-10">
      <div className="max-w-xl  space-y-6">
    <StoryBar/>

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
    </main>

  </div>
);
};

export default Feed;