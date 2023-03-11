import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./SignUpNav/Nav";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserProfile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [blogCategory, setBlogCategory] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [category, setCategory] = useState({
    category: "",
  });
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("blogs")) || []
  );
  // const [categories , setCategories]=useState([]);

  const userId = localStorage.getItem("user_id");

  const back = () => {
    navigate(-1);
  };
  const getUserProfile = async () => {
    try {
      await axios
        .get("http://127.0.0.1:8000/api/singleUser/" + userId)
        .then((res) => {
          console.log(res.data);
          setUserProfile(res.data);
          // console.log(res.data.map((elem) => elem.title));
        });

      // alert("plz check the fields")
    } catch (error) {
      // console.log(error.response.data.errors);
      //   setError(error.response.data.errors)
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  const createBlog = () => {
    navigate(`/createBlog/${userId}`);
  };

  const createCategory = async (e) => {
    setShowModal(false);

    e.preventDefault();
    const newCategories = [...categories, category];
    setCategories(newCategories);
    try {
      await axios
        .post("http://localhost:8000/api/createCategory", category)
        .then((res) => {
          console.log(res);

          console.log(category);
          console.log(res.data);
          setCategory({
            category: "",
          });
          console.log(categories);

          // console.log("res,", formData);
          // navigate("/");
        });

      // alert("plz check the fields")
    } catch (error) {
      // console.log(error.response.data.errors)
      // setErrorText(error.response.data.errors)
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const showSingleIdBlog = () => {
    navigate(`/showBlogs/${userId}`);
    console.log("first");
  };
  const ShowCategories = () => {
    setShowCategory(true);
  };

  const fetchCatogories = async () => {
    try {
      await axios.get(`http://localhost:8000/api/allCategory`).then((res) => {
        console.log(res.data);
        setBlogCategory(res.data);
        // console.log(res.data.map((elem) => elem.title));
      });

      // alert("plz check the fields")
    } catch (error) {
      // console.log(error.response.data.errors);
      //   setError(error.response.data.errors)
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCatogories();
  }, []);

  const deleteCategory = (id) => {
    console.log("deleted");

    const newCategory = blogCategory.filter((elm) => {
      if (elm.id !== id) {
        return elm;
      }
    });
    setBlogCategory(newCategory);

    try {
      axios.delete(`http://localhost:8000/api/deleteCategory/${id}`);
    } catch {
      console.log("id not found");
    }
  };
  return (
    <>
      <Nav />

      <main className=" mt-72 relative  profile-page">
        <section className="relative  block h-500-px">
          <div
            style={{
              backgroundImage:
                'url("https://tse2.mm.bing.net/th?id=OIP.ncOCV5LVCL8j70Edjgyn6QHaGy&pid=Api&P=0")',
              backgroundPosition: "center",
              backgroundSize: "cover",
              left: "45%",
            }}
            className="h-44 w-44 sm:left-7  rounded-full bg-black absolute -top-64  z-30"
          ></div>

          <div
            className="w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")',
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 "
            />
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x={0}
              y={0}
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container  mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words pt-5 bg-slate-100 w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6 text-slate-800">
                <div className="flex flex-wrap  items-center justify-between">
                  <button
                    className="bg-slate-600 -mt-14 mr-20 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center ">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex mr-4 text-sm focus:outline-none ">
                              <button
                                className="bg-slate-600 mr-20 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                              >
                                Create
                              </button>
                            </Menu.Button>
                          </div>
                          <div className="py-6 px-3 mt-32 sm:mt-0"></div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute top-10 right-8 z-10  w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to={`/createBlog/${userId}`}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block text-left px-4 py-2 text-sm text-gray-900"
                                    )}
                                  >
                                    Create Blog
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <span
                                    onClick={() => setShowModal(true)}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block text-left px-4 py-2 cursor-pointer text-sm text-black"
                                    )}
                                  >
                                    Create Category
                                  </span>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>

                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex mr-4 text-sm focus:outline-none ">
                              <button
                                className="bg-lime-600 mr-20 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                              >
                                My Blogs
                              </button>
                            </Menu.Button>
                          </div>
                          <div className="py-6 px-3 mt-32 sm:mt-0"></div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute top-10 right-8 z-10  w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    // to={`/showBlogs/${userId}`}
                                    onClick={showSingleIdBlog}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block text-left px-4 py-2 text-sm text-gray-900"
                                    )}
                                  >
                                    Blogs
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <span
                                    onClick={ShowCategories}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block text-left px-4 py-2 text-sm text-black"
                                    )}
                                  >
                                    Categories
                                  </span>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>

                  <div className="w-full  lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 mt-8 pt-8"></div>
                  </div>
                </div>

                {/* </div> */}
                <div className="text-center mt-12">
                  {/* <h3 className="text-4xl font-normal leading-normal mb-2 text-blueGray-700 ">
                    {userProfile.first_name}
                    {userProfile.last_name}
                  </h3> */}
                  <h3 className="text-4xl font-normal leading-normal mb-2 text-blueGray-700 ">
                    {userProfile.user_name}
                  </h3>

                  <div className="text-sm  text-stone-600 leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt  mr-2 text-lg text-blueGray-400" />
                    {userProfile.email}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400" />
                  </div>
                </div>

                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-sm leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8"></footer>
        </section>
      </main>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h2 className="text-3xl font-normal">Create Category</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Enter category name
                  </p>
                  <input
                    type="text"
                    value={category.category}
                    onChange={(event) =>
                      setCategory({ ...category, category: event.target.value })
                    }
                    className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={createCategory}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showCategory ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h2 className="text-3xl font-normal">List Of Categories</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="block p-3 bg-white  rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent">
                    {blogCategory.map((elements, index) => {
                      return (
                        <>
                          <div className="flex items-center justify-between">
                            <h3>{index + 1} - </h3>
                            <p className="capitalize ml-3">
                              {elements.category}
                            </p>
                            <div class="flex space-x-2 justify-center">
                              <button
                                onClick={() => deleteCategory(elements.id)}
                                type="button"
                                class="inline-block my-1 p-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                              >
                                delete
                              </button>
                            </div>
                          </div>
                          <hr />
                        </>
                      );
                    })}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className=" bg-slate-400 rounded-lg  font-bold uppercase px-2 py-1 text-sm outline-none focus:outline-none  ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowCategory(false)}
                  >
                    okay
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default UserProfile;
