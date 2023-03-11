import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./SignUpNav/Nav";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ShowCategories from "./ShowCategories";
import Blogs from "./Blogs";
// import { useParams } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const [blogData, setBlogData] = useState([]);

  const navigate = useNavigate();
  // const {id}=useParams();
  const id = localStorage.getItem("user_id");

  const fetchBlogs = async () => {
    try {
      await axios.get("http://127.0.0.1:8000/api/allBlogs").then((res) => {
        console.log(res.data);
        setBlogData(res.data);
      });

      // alert("plz check the fields")
    } catch (error) {

      window.alert("unable to fetch , check connection")
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = (id) => {
    console.log("deleted");

    const newBlogData = blogData.filter((elm) => {
      if (elm.id !== id) {
        return elm;
      }
    });
    setBlogData(newBlogData);

    try {
      axios.delete(`http://127.0.0.1:8000/api/deleteBlog/${id}`);
    } catch {
      console.log("id not found");
    }
  };

  const readMore = (id) => {
    navigate(`/blogs/${id}`);
    // navigate("blogs");
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen ">
        <article
          className="relative w-full min-h-screen  bg-cover bg-center group rounded-lg overflow-hidden  "
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")',
            height: "450px",
          }}
        >
          <div className="absolute  inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out" />
          <div className="relative  w-full h-full px-4 sm:px-6 lg:px-4">
            <h3 className="text-left text-2xl sm:text-gray-800  font-medium mt-40 ml-20">
              <a
                className="text-white text-4xl   font-bold text-center"
                href="#"
              >
                <span className="absolute inset-0" />
                Welcome to Your Blog
              </a>
            </h3>
            <p
              style={{ maxWidth: "900px" }}
              className=" mt-10 ml-20 text-white text-2xl font-light text-left"
            >
              Blogging is good for your career. A well-executed blog sets you{" "}
              <br />
              apart as an expert in your field. <br />
              <br />
            </p>
            <span className="ml-20 text-white">
              Select the blog category you want to explore...
            </span>
          </div>
          <div className="z-50 absolute top-96 left-24">
            <ShowCategories />
          </div>
          <button className="absolute top-0 left-0 z-50">Reset</button>
        </article>
      </div>
      <div className="flex bg-slate-700 w-full h-auto justify-around items-center flex-wrap">
        {blogData.map((elements) => {
          const { title, image, category, description, id, blog_user_id } =
            elements;
          // const date = new Date(elements.created_at);
          // const formattedDate = date.toISOString().slice(0, 10);
          // const addLeadingZero = num => num.toString().padStart(2, '0');

          const date = new Date(elements.created_at);
          const year = date.getFullYear();
          const month = date.toLocaleString('default', {month: 'long'});
          const day = date.getDate();
          const ordinalIndicator = ["th", "st", "nd", "rd"][(day % 100 > 3 && day % 100 < 21) || day % 10 > 3 ? 0 : day % 10];
          const time = date.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: true});

          const imgArr = [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1609010697446-11f2155278f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            " https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            "   https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          ];
          function random_item(imgArr) {
            return imgArr[Math.floor(Math.random() * imgArr.length)];
          }
          return (
            <>
              <div
                style={{ width: "470px" }}
                class=" m-0   flex flex-wrap items-center   justify-between"
              >
                <div class="container max-w-lg bg-white rounded-xl dark:bg-gray-800 shadow-lg transform duration-200 easy-in-out m-12">
                  <div class="h-2/4 sm:h-64 overflow-hidden">
                    <img
                      className="w-full h-64 rounded-xl"
                      src={`http://localhost:8000/${image}`}
                    />
                  </div>
                  <Menu as="div" className="absolute pt-3 right-0">
                    <div>
                      {localStorage.getItem("user_id") == blog_user_id ||
                      localStorage.getItem("role") == "admin" ? (
                        <Menu.Button className="flex mr-4 text-sm ">
                          <span className="sr-only">Open user menu</span>
                          {/* <Bars3Icon 
                                  className="block h-6 w-6  text-black"
                                  aria-hidden="true"
                                /> */}

                          <svg
                            class="w-6 h-6 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            // hidden for next page
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            ></path>
                          </svg>
                        </Menu.Button>
                      ) : null}
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-8 z-10 mt-2 w-32 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {localStorage.getItem("user_id") == blog_user_id ||
                        localStorage.getItem("role") == "user" ? (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/editBlog/${id}`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block text-left px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Edit
                              </Link>
                            )}
                          </Menu.Item>
                        ) : null}
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={() => deleteBlog(id)}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block cursor-pointer text-left px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Delete
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <div class="flex justify-start px-5 -mt-12 mb-5">
                    <span clspanss="block relative h-32 w-32">
                      <img
                        alt="Photo by aldi sigun on Unsplash"
                        src={random_item(imgArr)}
                        class="mx-auto object-cover rounded-full h-24 w-24 bg-white p-1"
                      />
                    </span>
                  </div>
                  <div>
                    <div class="px-7 h-48  mb-3">
                      <div className="flex items-center justify-between h-6">
                        <div class=" text-xs px-2 py-1 font-medium uppercase cursor-pointer bg-red-700 max-w-min   rounded-lg text-gray-300 hover:bg-slate-800 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200">
                          {category}
                        </div>

                        <div className="text-gray-500 from-neutral-500 font-serif ">
                        {` ${day}${ordinalIndicator} ${month} ${year} `} <br /> {time}

                        </div>
                      </div>
                      <h2 class="text-2xl capitalize font-normal mt-2 text-blue-900 dark:text-gray-300">
                        {title}
                      </h2>
                      <p class="mt-2 text-gray-600 font-light dark:text-gray-300">
                        {description}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corrupti, excepturi recusandae in fugiat eligendi amet,
                        laborum dolorum saepe
                      </p>
                    </div>
                    <hr />
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => readMore(id)}
                        class="group mb-3 mt-2 mr-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                      >
                        Read more
                        <span
                          aria-hidden="true"
                          class="block transition group-hover:translate-x-0.5"
                        >
                          &rarr;
                        </span>
                      </button>
                      <div
                        class="modal fade"
                        id="exampleModalCenter"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
