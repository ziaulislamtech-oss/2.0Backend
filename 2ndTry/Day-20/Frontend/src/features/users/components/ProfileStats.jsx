const ProfileStats = ({ user }) => {

    return (

        <div className="flex gap-16 py-8 border-b border-gray-800">

            <div>

                <h2 className="text-2xl font-bold">
                    {user.posts}
                </h2>

                <p className="text-gray-400">
                    Posts
                </p>

            </div>

            <div>

                <h2 className="text-2xl font-bold">
                    {user.followers}
                </h2>

                <p className="text-gray-400">
                    Followers
                </p>

            </div>

            <div>

                <h2 className="text-2xl font-bold">
                    {user.following}
                </h2>

                <p className="text-gray-400">
                    Following
                </p>

            </div>

        </div>

    );

};

export default ProfileStats;