import { Outlet } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import MobileBottomNav from "../components/MobileBottomNav";

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#0C1014]">

            {/* Desktop Sidebar */}
            <SideNavbar />

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav />

            {/* Main Content */}
            <main className="lg:ml-64 pb-20 lg:pb-0">
                <Outlet />
            </main>

        </div>
    );
};

export default Layout;