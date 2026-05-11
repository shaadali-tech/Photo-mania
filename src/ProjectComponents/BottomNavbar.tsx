import { Link, useLocation } from "react-router-dom";

import { AiFillHome, AiOutlineSearch } from "react-icons/ai";

import { FaUser } from "react-icons/fa";

import { MdExplore } from "react-icons/md";

const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      icon: <AiFillHome size={24} />,
    },

    {
      path: "/explore",
      icon: <MdExplore size={24} />,
    },

    {
      path: "/search",
      icon: <AiOutlineSearch size={24} />,
    },

    {
      path: "/profile",
      icon: <FaUser size={22} />,
    },
  ];

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        dark:bg-zinc-900
        border-t
        border-zinc-200
        dark:border-zinc-700
        flex
        justify-around
        items-center
        py-3
        z-50
        md:hidden
      "
    >
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`
            transition
            ${
              location.pathname === item.path
                ? "text-pink-500 scale-110"
                : "text-zinc-500"
            }
          `}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default BottomNavbar;
