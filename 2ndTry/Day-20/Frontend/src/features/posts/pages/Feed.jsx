import React, { useEffect } from "react";
import Post from "../components/Post";
import usePost from "../hook/usePost";
import FeedSkeleton from "../components/FeedSkeleton";

const Feed = () => {
  const { handleGetFeed, feed, loading } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  return (
    <div className="min-h-screen bg-[#0C1014] py-10">
      <div className="max-w-xl mx-auto space-y-6">

        {loading ? (
          <FeedSkeleton />
        ) : (
          feed.map((post) => (
            <Post
              key={post._id}
              caption={post.caption}
              imgUrl={post.imgUrl}
              user={post.user.username}
              profileImg={post.user.profileImage}
              isLiked={post.isLiked}
            />
          ))
        )}

      </div>
    </div>
  );
};

export default Feed;