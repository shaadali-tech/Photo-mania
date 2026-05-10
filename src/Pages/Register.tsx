import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";
import { auth, googleProvider } from "@/firebase/firebase.ts";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Register with Email
  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Update display name
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      alert("Account Created Successfully");
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email,
        bio: "",
        profileImage: "",
        followers: [],
        following: [],
        createdAt: new Date(),
      });
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Create or merge user document in Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          username: user.displayName || "",
          email: user.email || "",
          bio: "",
          profileImage: user.photoURL || "",
          createdAt: new Date(),
        },
        { merge: true },
      );

      navigate("/");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      alert((error as any).message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-950 via-red-950/30 to-pink-950/30 px-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-zinc-950 via-red-950/20 to-pink-950/20 border-pink-500/30 text-white shadow-2xl">
        <CardContent className="space-y-5 pt-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">
              Photoholic
            </h1>

            <p className="text-pink-300/70 mt-2 text-sm">Create your account</p>
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-sm text-pink-300">Username</label>

            <Input
              type="text"
              placeholder="Enter username"
              className="bg-zinc-900/50 border-pink-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500 focus:ring-pink-500/20"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm text-pink-300">Email</label>

            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-zinc-900/50 border-pink-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500 focus:ring-pink-500/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-pink-300">Password</label>

            <Input
              type="password"
              placeholder="Enter password"
              className="bg-zinc-900/50 border-pink-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500 focus:ring-pink-500/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-pink-300">Confirm Password</label>

            <Input
              type="password"
              placeholder="Confirm password"
              className="bg-zinc-900/50 border-pink-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500 focus:ring-pink-500/20"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <Button
            className="w-full cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-pink-500/30"></div>

            <span className="text-pink-400/70 text-sm">OR</span>

            <div className="h-px flex-1 bg-pink-500/30"></div>
          </div>

          {/* Google Signup */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white border-pink-500/50"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-pink-300/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-400 font-medium hover:text-pink-300 hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
