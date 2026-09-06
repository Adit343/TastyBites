"use client";

import React, { useState, useContext } from "react";
import UserContext from "../../../utils/UserContext";
import { useRouter } from "next/navigation";
import {
  FiLock,
  FiUser,
  FiMail,
  FiArrowRight,
  FiZap,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const { loginUser, signupUser } = useContext(UserContext);
  const router = useRouter();

  // Sign in state
  const [loginInput, setLoginInput] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);

  // Sign up state
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [showSignupPassword, setShowSignupPassword] = useState<boolean>(false);
  const [diet, setDiet] = useState<"All" | "Pure Veg" | "Vegan" | "Keto">("All");
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);

  // Status feedback
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!loginInput.trim() || !loginPassword.trim()) {
      setErrorMsg("Please fill in both email/username and password.");
      return;
    }

    const success = loginUser(loginInput, loginPassword);
    if (success) {
      setSuccessMsg("Welcome back! Redirecting to food feed...");
      setTimeout(() => {
        router.push("/body");
      }, 600);
    } else {
      setErrorMsg("Unable to sign in. Please check your credentials.");
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !signupPassword.trim()) {
      setErrorMsg("Please complete all required signup fields.");
      return;
    }

    if (!agreedTerms) {
      setErrorMsg("Please agree to the Terms of Service to continue.");
      return;
    }

    const success = signupUser(name, email, signupPassword, diet);
    if (success) {
      setSuccessMsg("Account created successfully! Welcome to TastyBites.");
      setTimeout(() => {
        router.push("/body");
      }, 600);
    } else {
      setErrorMsg("Could not create account. Please try again.");
    }
  };

  const handleQuickDemo = (demoName: string, demoEmail: string) => {
    signupUser(demoName, demoEmail, "demo123", "All");
    setSuccessMsg(`Logged in as ${demoName}! Redirecting...`);
    setTimeout(() => {
      router.push("/body");
    }, 600);
  };

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { label: "", color: "" };
    if (pass.length < 6) return { label: "Weak", color: "text-rose-400 bg-rose-500/20" };
    if (pass.length < 10) return { label: "Medium", color: "text-amber-400 bg-amber-500/20" };
    return { label: "Strong", color: "text-emerald-400 bg-emerald-500/20" };
  };

  const pwdStrength = calculatePasswordStrength(signupPassword);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="glass-card p-8 sm:p-10 rounded-3xl w-full max-w-md border border-white/10 relative overflow-hidden shadow-glass-lg space-y-6">
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 text-2xl font-black mx-auto shadow-glow-amber mb-2">
            TB
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Tasty<span className="text-amber-500">Bites</span> Auth Studio
          </h2>
          <p className="text-xs text-slate-400">
            Sign in to your account or create a new gourmet profile
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => {
              setActiveTab("signin");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "signin"
                ? "bg-amber-500 text-slate-950 shadow-glow-amber"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveTab("signup");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "signup"
                ? "bg-amber-500 text-slate-950 shadow-glow-amber"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Banners */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <FiCheckCircle className="text-base" /> {successMsg}
          </div>
        )}

        {/* SIGN IN FORM */}
        {activeTab === "signin" ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Email or Username</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type="text"
                  required
                  placeholder="Enter email or username (e.g. adit@tastybites.com)"
                  className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type={showLoginPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full glass-input pl-10 pr-10 py-3 rounded-xl text-sm"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showLoginPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-neon-amber py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-glow-amber cursor-pointer"
            >
              <span>Sign In to Account</span>
              <FiArrowRight className="text-base" />
            </button>

            {/* Quick Demo Fill Options */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                Quick Demo Accounts
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("Adit Shah", "adit@tastybites.com")}
                  className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs border border-white/10"
                >
                  ⚡ Adit Shah
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("Gourmet Member", "guest@tastybites.com")}
                  className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs border border-white/10"
                >
                  🍕 Guest Foodie
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* CREATE ACCOUNT FORM */
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Adit Shah"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type="email"
                  required
                  placeholder="adit@example.com"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Password</label>
                {pwdStrength.label && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${pwdStrength.color}`}>
                    {pwdStrength.label}
                  </span>
                )}
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type={showSignupPassword ? "text" : "password"}
                  required
                  placeholder="Create password (min 6 chars)"
                  className="w-full glass-input pl-10 pr-10 py-2.5 rounded-xl text-sm"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showSignupPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Diet Preference Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Dietary Preference</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(["All", "Pure Veg", "Vegan", "Keto"] as const).map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDiet(d)}
                    className={`py-1.5 text-[11px] font-bold rounded-xl border transition-all text-center ${
                      diet === d
                        ? "bg-amber-500/20 text-amber-400 border-amber-500"
                        : "bg-slate-900 text-slate-400 border-white/5 hover:border-white/20"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-[11px] text-slate-300 cursor-pointer">
                I agree to the <span className="text-amber-400 underline">Terms of Service</span> & Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="w-full btn-neon-amber py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-glow-amber cursor-pointer"
            >
              <FiShield className="text-base" /> Create Gourmet Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
