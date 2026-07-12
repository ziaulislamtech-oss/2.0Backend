import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfilePostsGrid from "../components/ProfilePostsGrid";
import useUser from "../hook/useUser";
import { useEffect } from "react";

const Profile = () => {

  const {profile,profileLoading,handleGetProfile,handleGetProfilePosts,profilePostsLoading,profilePosts} = useUser()

    const user = {
        username: "Zia Ul Islam",
        bio: "Learning MERN 🚀",
        profileImage:
            "https://ik.imagekit.io/18kjj0yy3/default_user_profile_image.webp?updatedAt=1772251040327",
        posts: 12,
        followers: 150,
        following: 98
    };

    useEffect(()=>{
      handleGetProfile()
      handleGetProfilePosts()
    },[])
    console.log('ProfilePosts : ',profilePosts)

    return (
        <div className="min-h-screen bg-[#0C1014] text-white">

            <div className="max-w-5xl mx-auto py-10 px-8">

                <ProfileHeader user={profile} />

                <ProfileStats user={profile} />

                <ProfilePostsGrid posts={profilePosts} />

            </div>

        </div>
    );
};

export default Profile;