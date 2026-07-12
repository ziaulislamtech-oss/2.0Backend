// src/layout/Layout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../features/posts/components/SideNavbar";


const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0C1014] flex">

      {/* Sidebar */}
      <SideNavbar/>

      {/* Page Content */}
      <main className="flex-1 ml-64">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;