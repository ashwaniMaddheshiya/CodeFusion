"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/icons/logo.svg";
import profileIcon from "/public/icons/profile.svg";
import notificationIcon from "/public/icons/notification.svg";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth hook

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user and logout from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle profile icon click to toggle the dropdown
  const handleProfileClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle logout click
  const handleLogout = () => {
    logout(); // Call the logout function
    setIsDropdownOpen(false); // Close the dropdown
  };

  return (
    <nav className="w-full text-white px-4 h-20">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Image src={logo} alt="Logo" width={40} height={40} />
          <h1 className="text-3xl font-bold">CodeFusion</h1>
        </div>

        {/* Show profile icon and notification only if the user is logged in */}
        {user && (
          <div className="relative flex items-center space-x-4">
            <button
              onClick={handleProfileClick}
              className="relative hover:text-gray-300"
            >
              <Image src={profileIcon} alt="Profile" width={20} height={20} />
            </button>

            {/* Dropdown for profile actions */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 top-[100%] w-48 bg-white text-black rounded-md shadow-lg">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
