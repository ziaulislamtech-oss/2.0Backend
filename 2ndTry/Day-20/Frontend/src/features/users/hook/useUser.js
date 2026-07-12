import { useContext } from "react";
import { UserContext } from "../users.context";
import { getFollowedUser } from "../service/userApi";

const useUser = () => {

    const context = useContext(UserContext);
    

    const {
        loading,
        setLoading,
        followedUsers,
        setFollowedUsers,
        suggestUsers,
        setSuggestUsers
    } = context;

    const handleGetFollowedUsers = async () => {

        setLoading(true);

        const response = await getFollowedUser();
        

        setFollowedUsers(response.followingUsers);

        setLoading(false);
    }

    return {
        loading,
        followedUsers,
        handleGetFollowedUsers
    };
}

export default useUser;