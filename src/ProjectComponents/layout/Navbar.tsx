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
    <nav className="h-16 border-b border-zinc-800 bg-black text-white px-6 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold">Photoholic</h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-zinc-400">{user?.email}</p>

        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
