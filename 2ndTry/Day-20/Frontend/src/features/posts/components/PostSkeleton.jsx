const PostSkeleton = () => {
  return (
    <div className="bg-[#161B22] border border-gray-700 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full shimmer"></div>

          <div>
            <div className="w-28 h-4 rounded shimmer mb-2"></div>
            <div className="w-16 h-3 rounded shimmer"></div>
          </div>

        </div>

        <div className="w-5 h-5 rounded shimmer"></div>

      </div>

      {/* Image */}
      <div className="w-full aspect-square shimmer"></div>

      {/* Actions */}
      <div className="flex justify-between px-4 py-3">

        <div className="flex gap-4">
          <div className="w-7 h-7 rounded-full shimmer"></div>
          <div className="w-7 h-7 rounded-full shimmer"></div>
          <div className="w-7 h-7 rounded-full shimmer"></div>
        </div>

        <div className="w-7 h-7 rounded shimmer"></div>

      </div>

      {/* Caption */}

      <div className="px-4 pb-4">

        <div className="w-36 h-4 rounded shimmer mb-3"></div>

        <div className="space-y-2">

          <div className="w-full h-4 rounded shimmer"></div>

          <div className="w-5/6 h-4 rounded shimmer"></div>

        </div>

      </div>

    </div>
  );
};

export default PostSkeleton;