import { useState } from "react";
import BottomNavbar from "@/ProjectComponents/BottomNavbar";
import Navbar from "@/ProjectComponents/layout/Navbar";
import Sidebar from "@/ProjectComponents/layout/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-red-950/20 to-pink-950/20 text-white">
      {/* Top Navbar */}
      <Navbar onMenuToggle={toggleSidebar} />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Main Content */}
        <main className="flex-1 p-6 pb-24 md:ml-64 w-full">{children}</main>
      </div>

      {/* Mobile Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
};

export default MainLayout;
