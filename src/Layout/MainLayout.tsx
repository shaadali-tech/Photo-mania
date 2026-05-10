import Navbar from "@/ProjectComponents/layout/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
