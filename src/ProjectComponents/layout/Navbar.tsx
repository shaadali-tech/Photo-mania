import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FaBars } from "react-icons/fa";

import { auth, db } from "../../firebase/firebase";

import { useAuth } from "../../Context/AuthContext";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar = ({ onMenuToggle }: NavbarProps) => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [loadingUsername, setLoadingUsername] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      if (!user?.uid) {
        setLoadingUsername(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUsername(userData.username || user.displayName || user.email);
        } else {
          setUsername(user.displayName || user.email);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername(user.displayName || user.email);
      } finally {
        setLoadingUsername(false);
      }
    };

    fetchUsername();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="h-16 border-b border-pink-500/30 bg-linear-to-r from-zinc-950 via-red-950/20 to-pink-950/20 text-white px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left Side - Hamburger Menu (Mobile) */}
      <button
        onClick={onMenuToggle}
        className="md:hidden text-pink-400 hover:text-pink-300 transition"
        aria-label="Toggle menu"
      >
        <FaBars size={24} />
      </button>

      {/* Logo */}
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-red-400">
        Photoholic
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-pink-300/70 hidden sm:block">
          {loadingUsername ? "Loading..." : username}
        </p>

        <Button
          className="bg-linear-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
