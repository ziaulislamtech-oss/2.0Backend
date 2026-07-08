import PostSkeleton from "./PostSkeleton";

const FeedSkeleton = () => {

    return (
        <div className="space-y-6">

            {[1,2,3].map((item)=>(
                <PostSkeleton key={item}/>
            ))}

        </div>
    );
};

export default FeedSkeleton;