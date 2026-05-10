import { useState } from "react";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "@/firebase/firebase.ts";

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
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
        <CardContent className="space-y-6 pt-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Photoholic</h1>

            <p className="text-zinc-400 mt-2 text-sm">
              Share your moments with the world
            </p>
          </div>
          <div className="space-y-2.75">
            <label className="text-sm text-zinc-300 ">Email</label>

            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-zinc-800 border-zinc-700 text-white "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2.75">
            <label className="text-sm text-zinc-300 ">Password</label>

            <Input
              type="password"
              placeholder="Enter your password"
              className="bg-zinc-800 border-zinc-700 text-white "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full cursor-pointer"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-zinc-700"></div>

            <span className="text-zinc-500 text-sm">OR</span>

            <div className="h-[1px] flex-1 bg-zinc-700"></div>
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 cursor-pointer bg-white text-black hover:bg-zinc-200"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
          <p className="text-center text-sm text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-white font-medium hover:underline"
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
