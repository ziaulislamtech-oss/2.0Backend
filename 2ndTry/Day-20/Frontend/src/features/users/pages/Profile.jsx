import { useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfilePostsGrid from "../components/ProfilePostsGrid";
import useUser from "../hook/useUser";

const Profile = () => {
  const {
    profile,
    handleGetProfile,
    handleGetProfilePosts,
    profilePosts,
  } = useUser();

  useEffect(() => {
    handleGetProfile();
    handleGetProfilePosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0C1014] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">

        <ProfileHeader user={profile} />

        <div className="mt-8">
          <ProfileStats user={profile} />
        </div>

        <div className="mt-10">
          <ProfilePostsGrid posts={profilePosts} />
        </div>

      </div>
    </div>
  );
};

export default Profile;