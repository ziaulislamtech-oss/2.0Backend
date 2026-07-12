import React from "react";
import { House, PlusSquare, Bookmark, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileBottomNav = () => {

    const navClass = ({ isActive }) =>
        `flex flex-col items-center justify-center flex-1 py-2 transition ${
            isActive
                ? "text-white"
                : "text-gray-400"
        }`;

    return (
        <nav
            className="
                fixed
                bottom-0
                left-0
                right-0
                z-50
                bg-[#0C1014]
                border-t
                border-[#2A2F36]
                flex
                lg:hidden
            "
        >
            <NavLink to="/" end className={navClass}>
                <House size={24} />
            </NavLink>

            <NavLink to="/createpost" className={navClass}>
                <PlusSquare size={24} />
            </NavLink>

            <NavLink to="/savedposts" className={navClass}>
                <Bookmark size={24} />
            </NavLink>

            <NavLink to="/profile" className={navClass}>
                <User size={24} />
            </NavLink>
        </nav>
    );
};

export default MobileBottomNav;