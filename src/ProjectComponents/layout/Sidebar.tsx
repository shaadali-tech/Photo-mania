import {
  FaHome,
  FaCompass,
  FaBell,
  FaUser,
  FaPlusSquare,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navItems = [
    { path: "/", icon: FaHome, label: "Home" },
    { path: "/search", icon: FaSearch, label: "Search" },
    { path: "/explore", icon: FaCompass, label: "Explore" },
    { path: "/notifications", icon: FaBell, label: "Notifications" },
    { path: "/create-post", icon: FaPlusSquare, label: "Create" },
    { path: "/profile", icon: FaUser, label: "Profile" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 h-screen border-r border-pink-500/30 bg-linear-to-b from-zinc-950 to-zinc-900/50 text-white p-6 hidden md:block fixed left-0 top-16">
        {/* Logo */}
        <h1 className="text-3xl font-bold mb-10 text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-red-400">
          Photoholic
        </h1>

        {/* Navigation */}
        <nav className="space-y-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <div className="flex items-center gap-4 cursor-pointer hover:text-pink-400 transition group">
                  <Icon
                    size={22}
                    className={
                      item.label === "Create" ? "group-hover:text-pink-500" : ""
                    }
                  />

                  <p
                    className={
                      item.label === "Create"
                        ? "text-lg group-hover:text-pink-400"
                        : "text-lg"
                    }
                  >
                    {item.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`
          fixed
          left-0
          top-16
          w-64
          h-[calc(100vh-64px)]
          bg-linear-to-b
          from-zinc-950
          to-zinc-900/50
          text-white
          p-6
          border-r
          border-pink-500/30
          z-40
          md:hidden
          transform
          transition-transform
          duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-400 hover:text-pink-300 transition"
          aria-label="Close sidebar"
        >
          <FaTimes size={24} />
        </button>

        {/* Logo */}
        <h1 className="text-3xl font-bold mb-10 mt-6 text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-red-400">
          Photoholic
        </h1>

        {/* Navigation */}
        <nav className="space-y-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="block"
              >
                <div className="flex items-center gap-4 cursor-pointer hover:text-pink-400 transition group">
                  <Icon
                    size={22}
                    className={
                      item.label === "Create" ? "group-hover:text-pink-500" : ""
                    }
                  />

                  <p
                    className={
                      item.label === "Create"
                        ? "text-lg group-hover:text-pink-400"
                        : "text-lg"
                    }
                  >
                    {item.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
