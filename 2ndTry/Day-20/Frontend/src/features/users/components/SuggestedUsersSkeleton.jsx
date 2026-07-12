const SuggestedUsersSkeleton = () => {
    return (
        <div className="bg-[#161B22] rounded-xl p-4">

            {[...Array(5)].map((_, index) => (

                <div
                    key={index}
                    className="flex items-center justify-between py-3 animate-pulse"
                >

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-[#2A2F36]" />

                        <div>

                            <div className="w-24 h-3 bg-[#2A2F36] rounded mb-2" />

                            <div className="w-16 h-2 bg-[#2A2F36] rounded" />

                        </div>

                    </div>

                    <div className="w-16 h-6 rounded bg-[#2A2F36]" />

                </div>

            ))}

        </div>
    );
};

export default SuggestedUsersSkeleton;