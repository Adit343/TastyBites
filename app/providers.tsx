"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import UserContext from "../utils/UserContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState<string>("");

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        {children}
      </UserContext.Provider>
    </Provider>
  );
}
