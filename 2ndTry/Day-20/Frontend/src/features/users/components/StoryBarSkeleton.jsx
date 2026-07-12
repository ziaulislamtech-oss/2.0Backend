const StoryBarSkeleton = () => {
    return (
        <div className="flex gap-5 overflow-hidden py-2">
            {[...Array(7)].map((_, index) => (
                <div key={index} className="flex flex-col items-center animate-pulse">

                    <div className="w-16 h-16 rounded-full bg-[#2A2F36]" />

                    <div className="w-12 h-3 bg-[#2A2F36] rounded mt-2" />

                </div>
            ))}
        </div>
    );
};

export default StoryBarSkeleton;