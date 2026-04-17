"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: isLogin ? "login" : "register", ...form }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
        setError(true);
        return;
      }

      if (isLogin) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);
        setMessage("Login successful!");
        setError(false);

        if (data.role === "Teacher") router.push("/teachers/teachershome");
        else if (data.role === "Admin") router.push("/dashboard");
        else router.push("/");
      } else {
        setMessage("Registered successfully! Please login.");
        setError(false);
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setMessage("Connection error. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Image/Branding */}
        <div className="md:w-1/2 bg-indigo-600 relative p-12 text-white flex flex-col justify-between overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-700 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Academia.</span>
            </div>
            
            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              {isLogin ? "Welcome Back to Your Dashboard" : "Start Your Journey With Us Today"}
            </h2>
            <p className="text-indigo-100 text-lg">
              Manage your classes, track student progress, and organize your academic life in one place.
            </p>
          </div>

          <div className="relative z-10 hidden md:block">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl">
              <p className="italic text-indigo-50">
                "This platform has completely transformed how I handle my grading and student communication."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-400 border-2 border-white/50" />
                <div>
                  <p className="font-bold text-sm">Sarah Jenkins</p>
                  <p className="text-xs text-indigo-200">Senior Educator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {isLogin ? "Sign In" : "Create Account"}
              </h1>
              <p className="text-slate-500 text-sm">
                Please enter your details to access your account.
              </p>
            </header>

            {message && (
              <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
                error ? "bg-red-50 text-red-600 border border-red-100" : "bg-green-50 text-green-600 border border-green-100"
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  required
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-indigo-600 hover:underline font-medium">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group disabled:bg-indigo-300"
              >
                {loading ? "Processing..." : isLogin ? "Sign In" : "Register Now"}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                {isLogin ? "New to Academia?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-indigo-600 font-bold ml-2 hover:underline"
                >
                  {isLogin ? "Create an account" : "Log in here"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}