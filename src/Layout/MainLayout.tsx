import BottomNavbar from "@/ProjectComponents/BottomNavbar";
import Navbar from "@/ProjectComponents/layout/Navbar";
import Sidebar from "@/ProjectComponents/layout/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-red-950/20 to-pink-950/20 text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 pb-24">{children}</main>
      </div>

      {/* Mobile Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
};

export default MainLayout;
