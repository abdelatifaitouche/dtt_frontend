import React, { useState } from "react";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

function Login() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-1">
      <div className="flex flex-col md:flex-row items-center  w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side: Image & Text */}
        <div className="hidden md:flex h-[100vh] flex-col items-center justify-center w-1/2  p-1 text-black text-center">
          <img
            src="assets/corporate_bg.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right Side: Login/Register */}
        <div className="w-full md:w-1/2 p-6 dark:bg-gray-800">
          {/* Wrapper for smooth transitions */}
          <div className="relative w-full">
            <div
              className={`transition-opacity duration-500 ${
                showLogin
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 absolute"
              }`}
            >
              {showLogin && <LoginForm />}
            </div>
            <div
              className={`transition-opacity duration-500 ${
                showLogin
                  ? "opacity-0 scale-95 absolute"
                  : "opacity-100 scale-100"
              }`}
            >
              {!showLogin && <RegisterForm />}
            </div>
          </div>
          <button
            className="mt-1 px-2 py-2 text-blue-600 rounded-lg  transition-all w-full"
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? "Create an account" : "Login to your account"}
          </button>
          {/* Switch Button */}
          <a
            href="#"
            class="flex items-center justify-center mt-3 text-sm font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
          >
            <img
              class="w-8 h-8 mr-2"
              src={require("../assets/logo_gt.png")}
              alt="logo"
            />
            Grant Thornton
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;
