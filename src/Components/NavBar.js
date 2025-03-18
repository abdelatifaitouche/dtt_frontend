import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  let { user, logoutUser } = useContext(AuthContext);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const username = localStorage.getItem("authTokens")
    ? jwtDecode(localStorage.getItem("authTokens")).username
    : "";

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-lg shadow sm:hidden"
      >
        {showMenu ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-md transition-transform transform ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-4 py-6 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center mb-5">
              <img
                src={require("../assets/logo_gt.png")}
                className="h-7 mr-3"
                alt="Logo"
              />
              <span className="text-md font-bold text-black">
                Tax-Advisor <span className="text-green-500">PRO</span>
              </span>
            </div>

            {/* Welcome Message */}
            <h1 className="text-sm font-bold text-gray-900 mb-4">
              Welcome, <span className="text-purple-600">{username}</span>
            </h1>

            {/* Navigation Links */}
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100"
                >
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/chatbot"
                  className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100"
                >
                  <span className="ml-3">Chatbot</span>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100"
                >
                  <span className="ml-3">Help</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={logoutUser}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 w-full"
            >
              <span className="ml-3">Sign Out</span>
            </button>

            {/* Footer */}
            <div className="flex items-center mt-4">
              <img
                src={require("../assets/logo_gt.png")}
                className="h-7 mr-3"
                alt="Powered by Grant Thornton"
              />
              <span className="text-sm font-semibold">
                Powered by Grant Thornton
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
