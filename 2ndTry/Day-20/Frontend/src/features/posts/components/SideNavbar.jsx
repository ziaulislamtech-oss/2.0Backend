import React from "react";
import {
    House,
    PlusSquare,
    Bookmark,
    User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const SideNavbar = ({ createPost }) => {


    const navClass = ({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl transition ${isActive
            ? "bg-[#2A2F36] text-white"
            : "text-gray-300 hover:bg-[#2A2F36] hover:text-white"
        }`;

        const navigate = useNavigate()


    return (
        <aside className="fixed left-0 top-0   flex flex-col justify-between p-6">

            {/* Top Section */}
            <div>
                {/* Logo */}
                <h1 className="text-3xl font-bold text-white mb-12">
                    Instagram
                </h1>

                {/* Navigation */}
                <nav className="space-y-2">

                    <NavLink to="/" end className={navClass}>
                        <House size={24} />
                        <span>Home</span>
                    </NavLink>

                    <NavLink to="/createpost" className={navClass}>
                        <PlusSquare size={24} />
                        <span>Create Post</span>
                    </NavLink>

                    <NavLink to="/savedposts" className={navClass}>
                        <Bookmark size={24} />
                        <span>Saved Posts</span>
                    </NavLink>

                    <NavLink to="/profile" className={navClass}>
                        <User size={24} />
                        <span>Profile</span>
                    </NavLink>

                </nav>
            </div>

            {/* Bottom */}
            <div className="text-sm text-gray-500">
                © 2026 Instagram Clone
            </div>

        </aside>
    );
};

export default SideNavbar;