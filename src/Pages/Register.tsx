import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

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

      await signInWithPopup(auth, googleProvider);

      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white shadow-2xl">
        <CardContent className="space-y-5 pt-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Photoholic</h1>

            <p className="text-zinc-400 mt-2 text-sm">Create your account</p>
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-sm text-zinc-300">Username</label>

            <Input
              type="text"
              placeholder="Enter username"
              className="bg-zinc-800 border-zinc-700 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm text-zinc-300">Email</label>

            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-zinc-800 border-zinc-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-zinc-300">Password</label>

            <Input
              type="password"
              placeholder="Enter password"
              className="bg-zinc-800 border-zinc-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-zinc-300">Confirm Password</label>

            <Input
              type="password"
              placeholder="Confirm password"
              className="bg-zinc-800 border-zinc-700 text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <Button
            className="w-full cursor-pointer"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-zinc-700"></div>

            <span className="text-zinc-500 text-sm">OR</span>

            <div className="h-[1px] flex-1 bg-zinc-700"></div>
          </div>

          {/* Google Signup */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 cursor-pointer bg-white text-black hover:bg-zinc-200"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-medium hover:underline"
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
