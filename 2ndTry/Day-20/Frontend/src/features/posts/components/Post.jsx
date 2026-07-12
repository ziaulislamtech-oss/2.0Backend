import React, { useState } from "react";
import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    MoreHorizontal,
} from "lucide-react";

const Post = ({ imgUrl, post, toggleLike,toggleSavePost }) => {

   

    const [animateHeart, setAnimateHeart] = useState(false)
    const [animateSave,setAnimateSave] = useState(false)

    const handleHeartClick = async () => {

        setAnimateHeart(true)

        setTimeout(() => {
            setAnimateHeart(false)
        }, 300);

        toggleLike(post._id)

    }

    const handleSaveClick = async ()=>{

        setAnimateSave(true)

        setTimeout(() => {
            setAnimateSave(false)
        }, 300);

        toggleSavePost(post._id)
    }



    return (
    <div className="w-full bg-[#161B22] border border-[#2A2F36] rounded-xl overflow-hidden text-white">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <img
                        src={post.user.profileImage}
                        alt="profile"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                    />

                    <div>
                        <h3 className="font-semibold text-xs sm:text-sm">{post.user.username}</h3>

                    </div>
                </div>

                <button className="text-gray-300 hover:text-white transition">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Post Image */}
            <div className="w-full">
                <img
                    src={post.imgUrl}
                    alt="post"
                   className="w-full aspect-square object-cover"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-3">
                <div className="flex items-center gap-4">
                    <button onClick={handleHeartClick} className="hover:text-red-500 transition">
                        <Heart
                            className={`cursor-pointer transition ${post.isLiked
                                ? "fill-red-500 text-red-500"
                                : "text-white hover:text-red-500"
                                }
                                ${animateHeart ? "heart-pop" : ""}
                                
                                `}
                            size={26} />
                    </button>

                    <button className="hover:text-gray-300 transition">
                        <MessageCircle size={26} />
                    </button>

                    <button className="hover:text-gray-300 transition">
                        <Send size={26} />
                    </button>
                </div>

                <button onClick={handleSaveClick} className="hover:text-yellow-400 transition">
                    <Bookmark 
                     className={`cursor-pointer transition ${post.isSaved
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-white hover:text-yellow-400"
                                }
                                ${animateSave ? "heart-pop" : ""}
                                
                                `}
                    size={26} />
                </button>
            </div>

            {/* Likes */}


            {/* Caption */}
            <div className="px-4 pt-2">
                <p className="text-sm leading-relaxed">
                    <span className="font-semibold mr-2">
                        {post.user.username}
                    </span>
                    {post.caption}
                </p>
            </div>





        </div>
    );
};

export default Post;