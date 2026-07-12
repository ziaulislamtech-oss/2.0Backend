import React from "react";

const ProfilePostsGrid = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Posts</h2>

        <div className="h-72 flex flex-col  items-center justify-center rounded-xl border border-gray-700 bg-[#11161B]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v9.75M3 16.5l4.5-4.5a2.25 2.25 0 013.182 0l2.636 2.636a2.25 2.25 0 003.182 0L21 10.5M3 16.5v.75A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25v-.75"
            />
          </svg>

          <h3 className="text-white text-xl mt-4 font-semibold">
            No Posts Yet
          </h3>

          <p className="text-gray-400 mt-2">
            Share your first photo with the world.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Posts ({posts.length})
      </h2>

      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group relative aspect-square overflow-hidden rounded-lg bg-[#1A1F24] cursor-pointer"
          >
            <img
              src={post.imgUrl}
              alt={post.caption}
              className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
              <p className="text-white text-sm font-medium line-clamp-2">
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePostsGrid;