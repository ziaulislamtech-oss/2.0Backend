import React from "react";
import { PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewPostButton = () => {

  const navigate = useNavigate()
  return (
    <button
      onClick={()=>navigate('/createpost')}
      className="  flex items-center gap-2 bg-[#BD2423] hover:bg-[#a91f1f] text-white px-5 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <PlusSquare size={22} />
      <span className="font-medium">New Post</span>
    </button>
  );
};

export default NewPostButton;