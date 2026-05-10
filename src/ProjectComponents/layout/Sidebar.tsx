import {
  FaHome,
  FaCompass,
  FaBell,
  FaUser,
  FaPlusSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Sidebar = () => {
  return (
    <aside className="w-64 h-screen border-r border-pink-500/30 bg-gradient-to-b from-zinc-950 to-zinc-900/50 text-white p-6 hidden md:block">
      {/* Logo */}
      <h1 className="text-3xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">
        Photoholic
      </h1>

      {/* Navigation */}
      <nav className="space-y-6">
        <Link to="/search">
          <div className="flex items-center gap-4 cursor-pointer hover:text-zinc-400 transition">
            <FaSearch size={22} />

            <p className="text-lg">Search</p>
          </div>
        </Link>
        <div className="flex items-center gap-4 cursor-pointer hover:text-pink-400 transition group">
          <FaHome size={22} className="group-hover:text-pink-500" />

          <p className="text-lg group-hover:text-pink-400">Home</p>
        </div>

        <Link to="/explore">
          <div className="flex items-center gap-4 cursor-pointer hover:text-zinc-400 transition">
            <FaCompass size={22} />

            <p className="text-lg">Explore</p>
          </div>
        </Link>
        <Link to="/notifications">
          <div className="flex items-center gap-4 cursor-pointer hover:text-zinc-400 transition">
            <FaBell size={22} />

            <p className="text-lg">Notifications</p>
          </div>
        </Link>

        <div className="flex items-center gap-4 cursor-pointer hover:text-pink-400 transition group">
          <FaPlusSquare size={22} className="group-hover:text-pink-500" />

          <p className="text-lg group-hover:text-pink-400">Create</p>
        </div>

        <Link to="/profile">
          <div className="flex items-center gap-4 cursor-pointer hover:text-zinc-400 transition">
            <FaUser size={22} />

            <p className="text-lg">Profile</p>
          </div>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
