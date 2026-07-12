import { useContext } from "react";
import { UserContext } from "../users.context";
import { getFollowedUser, getProfile, getProfilePosts, getSuggestedUsers } from "../service/userApi";

const useUser = () => {

    const context = useContext(UserContext);


    const {
        followingLoading,
        setFollowingLoading,
        suggestedLoading,
        setSuggestedLoading,
        followedUsers,
        setFollowedUsers,
        suggestUsers,
        setSuggestUsers,
        profile,
        setProfile,
       profileLoading,
       setProfileLoading,
       profilePostsLoading,
       setProfilePostsLoading,
       profilePosts,
       setProfilePosts
    } = context;

    const handleGetFollowedUsers = async () => {

        setFollowingLoading(true);

        const response = await getFollowedUser();


        setFollowedUsers(response.followingUsers);

        setFollowingLoading(false);
    }

    const handleGetSuggestedUsers = async () => {

        setSuggestedLoading(true)

        const response = await getSuggestedUsers()


        setSuggestUsers(response.suggestedUsers)

        setSuggestedLoading(false)
    }

    const handleGetProfile = async () => {

        
        setProfileLoading(true)

        const response = await getProfile()
        setProfile(response.user)

        setProfileLoading(false)




    }

    const handleGetProfilePosts = async()=>{
        setProfilePostsLoading(true)
        const response = await getProfilePosts()
        setProfilePosts(response.posts)
        console.log("----",profilePosts)
        setProfilePostsLoading(false)
    }

    return {
        followingLoading,
        followedUsers,
        suggestUsers,
        profile,
        handleGetProfile,
        profileLoading,
        setProfileLoading,
        handleGetFollowedUsers,
        handleGetSuggestedUsers,
        handleGetProfilePosts,
        profilePostsLoading,
        profilePosts
    };
}

export default useUser;