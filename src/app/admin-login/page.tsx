"use client";

import { useState } from "react";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

// Only this email can access admin
const ADMIN_EMAIL = "hireurbaniatempotraveller@gmail.com";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const login = async () => {
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      // Admin check (IMPORTANT)
      if (user.email !== ADMIN_EMAIL) {
        toast.error("You are not authorized");
        await signOut(auth);
        return;
      }

      toast.success("Login Successful 🎉");

      router.push("/admin");
    } catch (error: any) {
      console.error(error);

      // Better error handling
      if (error.code === "auth/user-not-found") {
        toast.error("User not found");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Wrong password");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border-1 border-white">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-3xl font-bold text-black mt-4">Admin Login</h1>

          <p className="text-slate-500 mt-2 text-sm">
            Secure access to dashboard panel
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-400 block mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none text-black placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-slate-400 block mb-2">
              Password
            </label>

            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-10 py-3 outline-none focus:ring-2 focus:ring-primary text-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-70 cursor-pointer"
          >
            {loading ? "Signing In..." : "Login to Dashboard"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Authorized admin access only
        </p>
      </div>
    </section>
  );
}
