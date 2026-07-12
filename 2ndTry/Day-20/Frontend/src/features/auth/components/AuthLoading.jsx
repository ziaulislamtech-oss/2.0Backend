// AuthLoading.jsx

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AuthLoading = () => {
    return (
        <div className="min-h-screen bg-[#0C1014] flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white mb-8">
                Instagram
            </h1>

            <AiOutlineLoading3Quarters
                className="animate-spin text-white"
                size={35}
            />

            <p className="text-gray-400 mt-5">
                Checking your session...
            </p>
        </div>
    );
};

export default AuthLoading;