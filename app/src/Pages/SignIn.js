import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./SignUpNav/Nav";

const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});

  const setError = (field, msg) => {
    setErrorMessage({
      ...errorMessage,
      [field]: msg,
    });
  };

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const register = () => {
    navigate("/signup");
  };

  const userLogIn = async (event) => {
    event.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/api/login", userData)
        .then((res) => {
          const userId = localStorage.setItem("user_id", res.data.user_id);
          const role = localStorage.setItem("role", res.data.role);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_name", res.data.user_name);

          navigate("/");
        });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          setErrorMessage(error.response.data.errors);
        } else {
          setErrorMessage({
            error: "Something went wrong. Please try again later.",
          });
        }
      } else {
        setErrorMessage({
          error: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  const handleOnchange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if (event.target.name === "email" && !validateEmail(event.target.value)) {
      setError("email", "Invalid email format");
    } else {
      setError("email", "");
    }
  };
  return (
    <>
      <Nav />
      <section className="bg-slate-400 min-h-screen pb-10 flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl items-center">
          {/* form */}
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              If you are already a member, easily log in
            </p>
            <form encType="multipart/form-data" className="flex flex-col gap-4">
              <input
                className="p-2 mt-8 rounded-lg border"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleOnchange}
                value={userData["email"]}
              />
              <p className="text-red-600 ml-2 text-xs">{errorMessage.email}</p>

              <div className="relative">
                <input
                  className="p-2 rounded-lg border w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userData["password"]}
                  onChange={handleOnchange}
                />
                <p className="text-red-600 ml-2 text-xs">
                  {errorMessage.password}
                </p>

                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg> */}
              </div>

              <button
                onClick={userLogIn}
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                Login
              </button>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Don't have an account?</p>
              <button
                onClick={register}
                className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              >
                Register
              </button>
            </div>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl h-full"
              src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsb2clMjBzaWduJTIwdXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
