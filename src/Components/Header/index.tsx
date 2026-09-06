"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useOnlineStatus from "../../../utils/useOnlineStatus";
import UserContext from "../../../utils/UserContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/types";

export const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setUserName } = useContext(UserContext);
  const cartItems = useSelector((store: RootState) => store.cart.items);
  const router = useRouter();

  const handleLogout = () => {
    setUserName("");
    router.push("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-white items-center p-4">
      <div className="logo-container">
        <Link href="/body">
          <img className="w-40" src="/images/tastybyte.png" alt="Logo" />
        </Link>
      </div>
      <div className="lg:hidden relative">
        <button
          onClick={toggleDropdown}
          className="text-3xl px-2 py-1 border border-gray-400 rounded"
        >
          &#9776;
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
            <ul className="flex flex-col p-2">
              <li className="px-4 py-2 hover:bg-gray-200">
                Online Status: {onlineStatus ? "✅" : "❌"}
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link href="/body">Home</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link href="/about">About</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link href="/contact">Contact</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link href="/cart" className="flex items-center">
                  <img className="w-7 mr-1" src="/images/shopping-cart.png" alt="Cart" />
                  <span>({cartItems?.length || 0})</span>
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <button
                  className="w-full text-left"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
              {loggedInUser && (
                <li className="px-4 py-2 font-bold hover:bg-gray-200">
                  Welcome, {loggedInUser}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className="hidden lg:flex items-center">
        <ul className="flex p-4 lg:m-0 items-center">
          <li className="px-4">Online Status: {onlineStatus ? "✅" : "❌"}</li>
          <li className="px-4 hover:font-bold">
            <Link href="/body">Home</Link>
          </li>
          <li className="px-4 hover:font-bold">
            <Link href="/about">About</Link>
          </li>
          <li className="px-4 hover:font-bold">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="px-4 font-bold text-xl flex items-center">
            <Link href="/cart" className="flex items-center">
              <img className="w-7 mr-1" src="/images/shopping-cart.png" alt="Cart" />
              <span>({cartItems?.length || 0})</span>
            </Link>
          </li>
          <li className="px-4">
            <button
              className="px-4 py-2 rounded bg-red-500 text-white"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
          {loggedInUser && (
            <li className="px-4 font-bold">Welcome, {loggedInUser}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
