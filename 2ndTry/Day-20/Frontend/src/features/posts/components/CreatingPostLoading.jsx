import React from "react";
import { LoaderCircle, ImagePlus } from "lucide-react";

const CreatePostLoading = () => {
  return (
    <div className="min-h-screen bg-[#1D1D1D] flex items-center justify-center px-4">

      <div className="bg-[#252525] rounded-xl p-10 w-full max-w-md flex flex-col items-center shadow-xl">

        <ImagePlus
          size={60}
          className="text-[#BD2423]"
        />

        <LoaderCircle
          size={50}
          className="animate-spin text-white mt-6"
        />

        <h2 className="text-white text-2xl font-bold mt-6">
          Creating your post
        </h2>

        <p className="text-gray-400 mt-2 text-center">
          Uploading your image and preparing everything...
        </p>

      </div>

    </div>
  );
};

export default CreatePostLoading;