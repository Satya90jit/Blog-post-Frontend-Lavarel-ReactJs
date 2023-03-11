import React, { useState } from "react";
import Nav from "./SignUpNav/Nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});

  const setError = (field, msg) => {
    setErrorMessage({
      ...errorMessage,
      [field]: msg,
    });
  };
  
  const [userData, setUserData] = useState({
    fast_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    // role:""
  });
  
  const handleOnchange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    
  
    if (event.target.name === "email" && !validateEmail(event.target.value)) {
      setError("email", "Invalid email format");
    } else {
      setError("email", "");
    }
  };
  
  const register = () => {
    navigate("/signin");
  };

  const userRegistration = async (event) => {
    event.preventDefault();
  
    try {
      await axios
        .post("http://127.0.0.1:8000/api/registration", userData)
        .then((res) => {
           const userId = localStorage.setItem("user_id", res.data.user_id);
          const role = localStorage.setItem("role",res.data.role);
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
  return (
    <>
      <Nav />
      {/* // style={{ backgroundImage: `url('${post.featuredImage.url}')` }} */}
      <section className="bg-slate-400 min-h-screen pb-10 flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-max items-center">
          <div className="md:w-1/2 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              Register if you don't have an account
            </p>
            <form encType="multipart/form-data" className="flex flex-col gap-4">
              <input
                className="p-2 mt-8 rounded-lg  "
                type="text"
                name="first_name"
                placeholder="Enter Fast Name"
                onChange={handleOnchange}
                value={userData["first_name"]}
              />
              <p className="text-red-600 ml-2 text-xs">{errorMessage.first_name}</p>

              <input
                className="p-2 rounded-lg  "
                type="text"
                name="last_name"
                placeholder="Enter Last Name"
                onChange={handleOnchange}
                value={userData["last_name"]}
                
              />
              <p className="text-red-600 ml-2 text-xs">{errorMessage.last_name}</p>

              <input
                className="p-2  rounded-lg  "
                type="text"
                name="user_name"
                placeholder="Username"
                onChange={handleOnchange}
                value={userData["user_name"]}
              />
              <p className="text-red-600 ml-2 text-xs">{errorMessage.user_name}</p>
              <input
                className="p-2 rounded-lg  "
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleOnchange}
                value={userData["email"]}
              />
              <p className="text-red-600 ml-2 text-xs">{errorMessage.email}</p>


              <div className="relative">
                <input
                  className="p-2 rounded-lg  w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleOnchange}
                  value={userData["password"]}
                />
              <p className="text-red-600 ml-2 text-xs">{errorMessage.password}</p>

              </div>

              <button
                onClick={userRegistration}
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                Register
              </button>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Have an account?</p>
              <button
                onClick={register}
                className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              >
                Log In
              </button>
            </div>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl h-full"
              src="https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMHJlZ2lzdHJhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
