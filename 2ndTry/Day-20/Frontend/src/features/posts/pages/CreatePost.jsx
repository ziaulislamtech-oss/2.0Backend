import React, { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usePost from "../hook/usePost";
import CreatePostLoading from "../components/CreatingPostLoading";

const CreatePost = () => {

    const [caption, setCaption] = useState('')
    const [preview, setPreview] = useState(null)
    const postImageInputfieldRef = useRef(null)
    const navigate = useNavigate()

    console.log(postImageInputfieldRef)

    const { loading, handleCreatePost } = usePost()

    async function handleSubmit(e) {
        e.preventDefault()

        const file = postImageInputfieldRef.current.files[0]
        await handleCreatePost(file, caption)

        navigate('/')

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (!file) return
        setPreview(URL.createObjectURL(file))
    }

    if (loading) {
        return <CreatePostLoading />
    }


    return (
        <div className="min-h-screen bg-[#1D1D1D] flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-[#25252581] rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    Create Post
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Upload Image
                        </label>

                        <label
                            htmlFor="image"
                            className="w-full h-56 border-2 border-dashed border-gray-600 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:border-[#BD2423] transition"
                        >

                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <ImagePlus
                                        size={55}
                                        className="text-gray-400 mb-3"
                                    />

                                    <p className="text-gray-400">
                                        Click to select an image
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        PNG, JPG, JPEG
                                    </p>
                                </div>
                            )}

                        </label>

                        <input
                            id="image"
                            ref={postImageInputfieldRef}
                            name="postImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    {/* Caption */}
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Caption
                        </label>

                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            rows="5"
                            placeholder="Write a caption..."
                            className="w-full bg-[#1D1D1D] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-[#BD2423]"
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="flex-1 border border-gray-600 text-gray-300 py-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 bg-[#BD2423] text-white py-3 rounded-lg font-semibold hover:bg-[#a91f1f] transition"
                        >
                            Create Post
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default CreatePost;