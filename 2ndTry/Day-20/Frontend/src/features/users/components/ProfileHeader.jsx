import { Pencil } from "lucide-react";

const ProfileHeader = ({ user }) => {

    return (

        <div className="flex items-center gap-14 border-b border-gray-800 pb-10">

            <img
                src={user.profileImage}
                className="w-36 h-36 rounded-full object-cover border-2 border-gray-700"
            />

            <div className="flex-1">

                <div className="flex items-center gap-4">

                    <h1 className="text-3xl font-semibold">
                        {user.username}
                    </h1>

                    <button className="flex items-center gap-2 bg-[#262626] px-4 py-2 rounded-lg hover:bg-[#333] transition">

                        <Pencil size={18} />

                        Edit Profile

                    </button>

                </div>

                <p className="mt-5 text-gray-300">
                    {user.bio}
                </p>

            </div>

        </div>

    );
};

export default ProfileHeader;