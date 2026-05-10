import {
  FaHome,
  FaCompass,
  FaBell,
  FaUser,
  FaPlusSquare,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen border-r border-pink-500/30 bg-linear-to-b from-zinc-950 to-zinc-900/50 text-white p-6 hidden md:block">
      {/* Logo */}
      <h1 className="text-3xl font-bold mb-10 text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-red-400">
        Photoholic
      </h1>

      {/* Navigation */}
      <nav className="space-y-6">
        <div className="flex items-center gap-4 cursor-pointer hover:text-pink-400 transition group">
          <FaHome size={22} className="group-hover:text-pink-500" />

          <p className="text-lg group-hover:text-pink-400">Home</p>
        </div>

        <div className="flex items-center gap-4 cursor-pointer hover:text-pink-400 transition group">
          <FaCompass size={22} className="group-hover:text-pink-500" />

          <p className="text-lg group-hover:text-pink-400">Explore</p>
        </div>

        <div className="flex items-center gap-4 cursor-pointer hover:text-pink-400 transition group">
          <FaBell size={22} className="group-hover:text-pink-500" />

          <p className="text-lg group-hover:text-pink-400">Notifications</p>
        </div>

        <div className="flex items-center gap-4 cursor-pointer hover:text-pink-400 transition group">
          <FaPlusSquare size={22} className="group-hover:text-pink-500" />

          <p className="text-lg group-hover:text-pink-400">Create</p>
        </div>

        <div className="flex items-center gap-4 cursor-pointer hover:text-pink-400 transition group">
          <FaUser size={22} className="group-hover:text-pink-500" />

          <p className="text-lg group-hover:text-pink-400">Profile</p>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
