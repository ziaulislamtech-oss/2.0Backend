import { useEffect } from "react";
import useUser from "../hook/useUser";
import StoryBarSkeleton from "./StoryBarSkeleton";


const StoryBar = () => {

    const {
        followedUsers,
        handleGetFollowedUsers,
        followingLoading
    } = useUser();

    console.log("story bar",followedUsers)

    useEffect(() => {
        handleGetFollowedUsers();
    }, []);

    if(followingLoading){
        return <StoryBarSkeleton/>
    }

    return (

        <div className="flex gap-5 overflow-x-auto pb-4">

            {
                followedUsers.map((user) => (

                    <div
                        key={user.followee._id}
                        className="flex flex-col items-center "
                    >
                        <div className=" rounded-full p-[6px] bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_100%)]">

                        <img
                            src={user.followee.profileImage}
                            className="w-25 rounded-full "
                        />
                        </div>

                        <p className="text-md font-semibold text-white mt-2">
                            {user.followee.username}
                        </p>

                    </div>

                ))
            }

        </div>

    );

};

export default StoryBar;