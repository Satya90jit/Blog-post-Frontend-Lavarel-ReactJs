import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const logoutToggle = () => {
    localStorage.clear();
    navigate("/");
  };
  const loginToggle = () => {
    navigate("/signin");
  };
  // const createBlog=()=>{
  //   navigate("createBlog")
  // }

  return (
    <nav className="w-full border  bg-white shadow-black">
      <div className="justify-between px-2 shadow-black mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between  md:py-5 md:block">
            <a href="javascript:void(0)">
              <h2 className="text-2xl font-bold">
                My <span className="text-red-800">Blog</span>
              </h2>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
             
              {localStorage.getItem("role") == "admin" ? (
                <Link
                  to="/admin"
                  className="block mt-4 lg:inline-block lg:mt-0 hover:text-red-800 mr-6"
                >
                  Admin Dashboard
                </Link>
              ) : null}

              <Link
                to="/"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-red-800 mr-6"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-red-800"
              >
                About
              </Link>

              {localStorage.getItem("token") ? (
                <>
                  <Link
                    to="/profile"
                    className="px-4 py-2 rounded--xl transition"
                  >
                    <img src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/32/null/external-profile-shopping-and-ecommerce-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="px-4 py-1 rounded-l-lg text-white m-0 bg-lime-600 hover:bg-red-600 transition"
                  >
                    Register
                  </Link>
                </>
              )}

              {localStorage.getItem("token") ? (
                <button
                  onClick={logoutToggle}
                  className="px-4 py-1 rounded-r-lg text-white bg-slate-700 transition"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={loginToggle}
                  className="px-4 py-1 rounded-r-lg text-white bg-slate-700 transition"
                >
                  Login
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
