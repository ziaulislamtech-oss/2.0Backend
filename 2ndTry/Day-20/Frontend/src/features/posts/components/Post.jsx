import React from "react";
import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    MoreHorizontal,
} from "lucide-react";

const Post = ({ imgUrl, caption, user, profileImg, isLiked }) => {
    return (
        <div className="max-w-lg mt-5 mx-auto bg-[#161B22] border border-[#2A2F36] rounded-xl overflow-hidden text-white">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <img
                        src={profileImg}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    <div>
                        <h3 className="font-semibold text-sm">{user}</h3>

                    </div>
                </div>

                <button className="text-gray-300 hover:text-white transition">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Post Image */}
            <div className="w-full">
                <img
                    src={imgUrl}
                    alt="post"
                    className="w-full h-[500px] object-cover"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4">
                    <button className="hover:text-red-500 transition">
                        <Heart
                            className={`cursor-pointer transition ${isLiked
                                    ? "fill-red-500 text-red-500"
                                    : "text-white hover:text-red-500"
                                }`}
                            size={26} />
                    </button>

                    <button className="hover:text-gray-300 transition">
                        <MessageCircle size={26} />
                    </button>

                    <button className="hover:text-gray-300 transition">
                        <Send size={26} />
                    </button>
                </div>

                <button className="hover:text-yellow-400 transition">
                    <Bookmark size={26} />
                </button>
            </div>

            {/* Likes */}


            {/* Caption */}
            <div className="px-4 pt-2">
                <p className="text-sm leading-relaxed">
                    <span className="font-semibold mr-2">
                        {user}
                    </span>
                    {caption}
                </p>
            </div>





        </div>
    );
};

export default Post;