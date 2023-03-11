import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./SignUpNav/Nav";

const AdminDashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  const fetchBlogUsers = async () => {
    try {
      await axios.get("http://127.0.0.1:8000/api/allUsers").then((res) => {
        console.log(res.data);
        setUsersData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogUsers();
  }, []);

  const deleteUser = (id) => {
    const newUsers = usersData.filter((elm) => {
      if (elm.id !== id) {
        return elm;
      }
    });
    setUsersData(newUsers);

    try {
      axios.delete(`http://127.0.0.1:8000/api/deleteUser/${id}`);
    } catch {
      console.log("id not found");
    }
  };

  const removeAdmin = (id) => {
    try {
      axios.post(`http://localhost:8000/api/terminateAdmin/${id}`);
      setIsAdmin(false);
      fetchBlogUsers();

    } catch {
      console.log("id not found");
    }
  };

  const makeAdmin = (id) => {
    try {
      axios.post(`http://localhost:8000/api/makeAdmin/${id}`);

      fetchBlogUsers();
      setIsAdmin(true);
    } catch {
      console.log("id not found");
    }
  };

  const imgArr = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1609010697446-11f2155278f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    " https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "   https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    " https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    " https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=",
    "https://media.istockphoto.com/id/1391365592/photo/beautiful-afro-woman.jpg?b=1&s=170667a&w=0&k=20&c=VxathWKg4S9MhZFPhxzRgdq34MrV1PDhRMtIT25LOus=",
    "https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?b=1&s=170667a&w=0&k=20&c=cVdVl-0bpliZ0Sduc7ZDkMPwLnbxaMXZONllS39oeFc=",
  ];

  function random_item(imgArr) {
    return imgArr[Math.floor(Math.random() * imgArr.length)];
  }

  const addLeadingZero = (num) => num.toString().padStart(2, "0");

  return (
    <>
      <Nav />
      <div className="bg-white p-8 rounded-md w-full">
        {/* <h2 className="text-3xl uppercase my-5">
          List Of Registered <span className="text-red-600">Blog Users</span>{" "}
        </h2> */}
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      S.L
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Profile
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                {usersData.length > 0 ? (
                  usersData.map((elements, index) => {
                    const { name, email, role, created_at, id } = elements;
                    const date = new Date(created_at);
                    const year = date.getFullYear();
                    const month = date.toLocaleString("default", {
                      month: "long",
                    });
                    const day = date.getDate();
                    const ordinalIndicator = ["th", "st", "nd", "rd"][
                      (day % 100 > 3 && day % 100 < 21) || day % 10 > 3
                        ? 0
                        : day % 10
                    ];
                    const time = date.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });
                    return (
                      <tbody>
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {index + 1}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={random_item(imgArr)}
                                  alt=""
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="ml-3">
                              <p className="text-gray-900 capitalize whitespace-no-wrap">
                                {name}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900  whitespace-no-wrap">
                              {email}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 capitalize whitespace-no-wrap">
                              {role}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {` ${day}${ordinalIndicator} ${month} ${year} ${time}`}
                            </p>
                          </td>
                          {/* {isAdmin ? ( */}
                            <td className=" border-b border-gray-200 bg-white text-sm">
                              <button
                                onClick={() => makeAdmin(id)}
                                class="block uppercase mx-auto shadow bg-green-700 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-5 rounded"
                              >
                                Make Admin
                              </button>
                            </td>
                          {/* ) : ( */}
                            <td className=" border-b border-gray-200 bg-white text-sm">
                              <button
                                onClick={() => removeAdmin(id)}
                                class="block uppercase mx-auto shadow bg-red-600 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-5 rounded"
                              >
                                Remove Admin
                              </button>
                            </td>
                          {/* )} */}
                          <td className=" border-b border-gray-200 bg-white text-sm">
                            <button
                              onClick={() => deleteUser(id)}
                              class="block uppercase mx-auto shadow bg-red-600 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-5 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                ) : (
                  <div className="w-screen bg-gray-100 flex items-center">
                    <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                      <div className="max-w-md">
                        <div className="text-5xl font-dark font-bold">Oops</div>
                        <p className=" mt-6 text-2xl md:text-3xl font-light capitalize leading-normal">
                          No Blogs Available...{" "}
                        </p>
                        <p className="mb-8 mt-4">
                          But dont worry, you can find plenty of other things on
                          our homepage.
                        </p>
                        <Link
                          to="/"
                          className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
                        >
                          back to homepage
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
