import { useState } from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db, googleProvider } from "@/firebase/firebase.ts";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const getGoogleErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/popup-blocked":
        return "Popup was blocked by your browser. Retrying with redirect...";
      case "auth/popup-closed-by-user":
        return "Google sign-in popup was closed before completing sign in.";
      case "auth/operation-not-allowed":
        return "Google sign-in is not enabled in Firebase Authentication.";
      case "auth/unauthorized-domain":
        return "This domain is not authorized in Firebase Auth. Add it in Firebase Console > Authentication > Settings > Authorized domains.";
      default:
        return "Google sign-in failed. Please try again.";
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      alert((error as any).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Ensure users profile document exists for Google sign-in from login page.
      await setDoc(
        doc(db, "users", user.uid),
        {
          username: user.displayName || "",
          email: user.email || "",
          bio: "",
          profileImage: user.photoURL || "",
        },
        { merge: true },
      );

      navigate("/");
    } catch (error) {
      const code = (error as { code?: string })?.code || "";

      if (code === "auth/popup-blocked") {
        alert(getGoogleErrorMessage(code));
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      alert(getGoogleErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-zinc-950 via-red-950/30 to-pink-950/30 px-4">
      <Card className="w-full max-w-md bg-linear-to-br from-zinc-950 via-red-950/20 to-pink-950/20 border-pink-500/30 text-white shadow-2xl">
        <CardContent className="space-y-6 pt-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-red-400">
              Photoholic
            </h1>

            <p className="text-pink-300/70 mt-2 text-sm">
              Share your moments with the world
            </p>
          </div>
          <div className="space-y-2.75">
            <label className="text-sm text-pink-300 ">Email</label>

            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-zinc-900/50 border-pink-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500 focus:ring-pink-500/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2.75">
            <label className="text-sm text-pink-300 ">Password</label>

            <Input
              type="password"
              placeholder="Enter your password"
              className="bg-zinc-900/50 border-pink-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500 focus:ring-pink-500/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full cursor-pointer bg-linear-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-pink-500/30"></div>

            <span className="text-pink-400/70 text-sm">OR</span>

            <div className="h-px flex-1 bg-pink-500/30"></div>
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 cursor-pointer bg-linear-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white border-pink-500/50"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
          <p className="text-center text-sm text-pink-300/70">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-pink-400 font-medium hover:text-pink-300 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
