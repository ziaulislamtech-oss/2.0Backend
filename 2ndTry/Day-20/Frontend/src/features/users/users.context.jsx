import { createContext, useState } from "react";


export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

    const [followingLoading, setFollowingLoading,] = useState(false)
    const [suggestedLoading, setSuggestedLoading] = useState(false)
    const [followedUsers, setFollowedUsers] = useState([])
    const [suggestUsers, setSuggestUsers] = useState([])
    const [profile, setProfile] = useState([])
    const [profileLoading,setProfileLoading] = useState(false)
    const [profilePosts,setProfilePosts] = useState([])
    const [profilePostsLoading,setProfilePostsLoading] = useState(false)


    return (
        <UserContext.Provider value={{
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
            profilePosts,
            setProfilePosts,
            profilePostsLoading,
            setProfilePostsLoading
        }}>
            {children}
        </UserContext.Provider>
    )

}