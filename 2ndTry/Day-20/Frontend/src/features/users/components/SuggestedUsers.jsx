import { useEffect } from "react";
import useUser from "../hook/useUser";
import SuggestedUsersSkeleton from "./SuggestedUsersSkeleton";

const SuggestedUsers = () => {

    const {
        suggestUsers,
        handleGetSuggestedUsers,
        suggestedLoading
    } = useUser();

    useEffect(() => {

        handleGetSuggestedUsers();

    }, []);

    if(suggestedLoading){
      return <SuggestedUsersSkeleton/>
    }


    return (

        <div className="bg-[#161B22] rounded-xl p-4">

            <h2 className="text-white font-semibold mb-4">
                Suggested for you
            </h2>

            {

                suggestUsers.map(user => (

                    <div
                        key={user._id}
                        className="flex items-center justify-between mb-4"
                    >

                        <div className="flex items-center gap-3">

                            <img
                                src={user.profileImage}
                                className="w-10 h-10 rounded-full"
                            />

                            <span className="text-white">
                                {user.username}
                            </span>

                        </div>

                        <button
                            className="text-blue-500 font-semibold"
                        >
                            Follow
                        </button>

                    </div>

                ))

            }

        </div>

    );

};

export default SuggestedUsers;