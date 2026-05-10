import { signOut } from "firebase/auth";

import { auth } from "../../firebase/firebase";

import { useAuth } from "../../Context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="h-16 border-b border-pink-500/30 bg-linear-to-r from-zinc-950 via-red-950/20 to-pink-950/20 text-white px-6 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-red-400">
        Photoholic
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-pink-300/70">{user?.email}</p>

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
