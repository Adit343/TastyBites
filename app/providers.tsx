"use client";

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import UserContext from "../utils/UserContext";
import { UserProfile } from "../types/types";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Restore user session on initial load
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tasty_auth_user");
      if (stored) {
        const parsed: UserProfile = JSON.parse(stored);
        setUserProfile(parsed);
        setUserName(parsed.name);
      }
    } catch (e) {
      console.error("Auth restore error:", e);
    }
  }, []);

  const loginUser = (emailOrName: string, _password?: string): boolean => {
    if (!emailOrName.trim()) return false;

    // Check stored registered accounts or create session
    let profile: UserProfile = {
      name: emailOrName.includes("@") ? emailOrName.split("@")[0] : emailOrName,
      email: emailOrName.includes("@") ? emailOrName : `${emailOrName.toLowerCase()}@tastybites.com`,
      dietPreference: "All",
      memberSince: new Date().getFullYear().toString(),
    };

    try {
      const storedAccounts = localStorage.getItem("tasty_user_accounts");
      if (storedAccounts) {
        const accounts: UserProfile[] = JSON.parse(storedAccounts);
        const match = accounts.find(
          (acc) =>
            acc.email.toLowerCase() === emailOrName.toLowerCase() ||
            acc.name.toLowerCase() === emailOrName.toLowerCase()
        );
        if (match) profile = match;
      }
      localStorage.setItem("tasty_auth_user", JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }

    setUserProfile(profile);
    setUserName(profile.name);
    return true;
  };

  const signupUser = (
    name: string,
    email: string,
    _password?: string,
    diet: "All" | "Pure Veg" | "Vegan" | "Keto" = "All"
  ): boolean => {
    if (!name.trim() || !email.trim()) return false;

    const newProfile: UserProfile = {
      name,
      email,
      dietPreference: diet,
      memberSince: new Date().getFullYear().toString(),
    };

    try {
      // Save to registered accounts list
      const storedAccounts = localStorage.getItem("tasty_user_accounts");
      const accounts: UserProfile[] = storedAccounts ? JSON.parse(storedAccounts) : [];
      accounts.push(newProfile);
      localStorage.setItem("tasty_user_accounts", JSON.stringify(accounts));
      localStorage.setItem("tasty_auth_user", JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }

    setUserProfile(newProfile);
    setUserName(newProfile.name);
    return true;
  };

  const logoutUser = () => {
    setUserProfile(null);
    setUserName(null);
    try {
      localStorage.removeItem("tasty_auth_user");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetUserName = (name: string) => {
    if (!name) {
      logoutUser();
    } else {
      loginUser(name);
    }
  };

  return (
    <Provider store={appStore}>
      <UserContext.Provider
        value={{
          loggedInUser: userName,
          userProfile,
          setUserName: handleSetUserName,
          loginUser,
          signupUser,
          logoutUser,
        }}
      >
        {children}
      </UserContext.Provider>
    </Provider>
  );
}
