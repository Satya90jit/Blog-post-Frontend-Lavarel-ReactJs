import axios from "axios";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import Nav from "./SignUpNav/Nav";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const Blogs = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const { id } = useParams();
  console.log(id);
  const [openModal, setOpenModal] = useState(false);
  const [comments, setcomments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [blogData, setBlogData] = useState([]);
  const [blog, setBlog] = useState({ comment: "", blog_id: "" });
  const [blogs, setBlogs] = useState(
    JSON.parse(localStorage.getItem("blogs")) || []
  );
  const usersName = localStorage.getItem("userName");

  const createComment = async (e) => {
    e.preventDefault();
    console.log("comment");
    const newBlogs = [...blogs, blog];
    setBlogs(newBlogs);
    // localStorage.setItem("blogs", JSON.stringify(newBlogs));
    try {
      await axios
        .post("http://127.0.0.1:8000/api/createComment/" + id, blog)
        .then((res) => {
          setCommentCount(commentCount + 1);
          console.log(res);
          console.log(res.data);
          setBlog({
            comment: "",
          });
          showComment();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleBlog = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/api/singleBlog/${id}`)
        .then((res) => {
          console.log(res.data);
          setBlogData(res.data);
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
    fetchSingleBlog();
  }, []);

  const showComment = async (e) => {
    try {
      await axios
        .get(`http://localhost:8000/api/getBlogComments/${id}`)
        .then((res) => {
          console.log(res);
          setcomments(res.data);
          console.log(res.data);
          console.log(res.data[2].comment);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showComment();
  }, []);
  const deleteComment = (id) => {
    console.log("comment deleted");
    const newComment = comments.filter((elm) => {
      if (elm.id !== id) {
        return elm;
      }
    });
    setCommentCount(commentCount - 1);
    setcomments(newComment);
    showComment();

    try {
      axios.delete(`http://127.0.0.1:8000/api/deleteComment/${id}`);
    } catch {
      console.log("id not found");
    }
  };

  // const createdAt = new Date(blogData.created_at);
  // const date = createdAt.toLocaleDateString();
  // const time = createdAt.toLocaleTimeString();
  const addLeadingZero = (num) => num.toString().padStart(2, "0");

  const date = new Date(blogData.created_at);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const ordinalIndicator = ["th", "st", "nd", "rd"][
    (day % 100 > 3 && day % 100 < 21) || day % 10 > 3 ? 0 : day % 10
  ];
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <>
      <Nav />
      <div>
        <section className="flex pb-20 pt-20 flex-col  justify-center antialiased bg-gray-900 text-gray-200 h-auto ">
          <div className="max-w-6xl mx-auto sm:px-6 h-full">
            {/* Blog post */}
            <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
              <a className="relative block group" href="#0">
                <div
                  className="absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
                  aria-hidden="true"
                />
                <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                  <img
                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
                    src={`http://localhost:8000/${blogData.image}`}
                    width={540}
                    height={303}
                    alt="Blog post"
                  />
                </figure>
              </a>
              <div>
                <header>
                  <div className="mb-3 relative">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      <li className="m-1">
                        <a
                          className="inline-flex uppercase text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
                          href="#0"
                        >
                          {blogData.category}
                        </a>
                      </li>
                    </ul>
                    <Menu as="div" className="absolute bottom-4 -right-3">
                      <div>
                        <span className="sr-only">Open user menu</span>
                        {/* <Bars3Icon 
                                className="block h-6 w-6  text-black"
                                aria-hidden="true"
                              /> */}
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
                        <Menu.Items className="absolute right-8 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                // onClick={(e) => {
                                //   setComArtId(com.article_id);
                                //   setComId(com.id);
                                //   openModal();
                                // }}
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
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                    <a
                      className="hover:text-gray-100 transition duration-150 ease-in-out"
                      href="#0"
                    >
                      {blogData.title}
                      {/* , A very intersting point to figure out */}
                    </a>
                  </h3>
                </header>
                <p className="text-lg text-gray-400 flex-grow">
                  {blogData.description}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium velit alias sunt pariatur assumenda repudiandae
                  nesciunt, et repellendus tenetur quisquam officiis
                  voluptatibus porro! Voluptatem, distinctio odit magni minima
                  iure hic.
                </p>
                <footer className="flex items-center mt-4">
                  <a href="#0">
                    <img
                      className="rounded-full flex-shrink-0 mr-4"
                      src="https://preview.cruip.com/open-pro/images/news-author-04.jpg"
                      width={40}
                      height={40}
                      alt="Author 04"
                    />
                  </a>
                  <div>
                    <a
                      className="font-medium text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out"
                      href="#0"
                    >
                      {usersName}
                    </a>
                    <span className="text-gray-700"> - </span>
                    <span className="text-gray-500  right-1 text-left">
                      {` ${day}${ordinalIndicator} ${month} ${year} ${time}`}
                    </span>
                  </div>
                  {localStorage.getItem("token") ? (
                    <button
                      onClick={() => setOpenModal(true)}
                      className="text-white font-normal ml-24  h-fit flex items-center  bg-slate-500  hover:text-white  px-2 border hover:border-transparent rounded"
                    >
                      {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 mr-2 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg> */}
                      comment
                    </button>
                  ) : null}
                </footer>
              </div>
            </article>
          </div>
        </section>
      </div>

      {openModal ? (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Discussion
                {/* ({commentCount}) */}
              </h2>
            </div>
            <form className="mb-6">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  value={blog.comment}
                  onChange={(event) =>
                    setBlog({ ...blog, comment: event.target.value })
                  }
                  rows={6}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required
                  defaultValue={""}
                />
              </div>
              {/* <input
                type="text"
                name
                placeholder="Type id..."
                className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-16"
                value={blog.blog_id}
                onChange={(event) =>
                  setBlog({ ...blog, blog_id: event.target.value })
                }
                defaultValue={""}
              /> */}
              <div className="flex items-center justify-end">
                <button
                  onClick={createComment}
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-slate-700 rounded-lg"
                >
                  Post comment
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  className=" ml-3 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
            {/* <Comments/> */}

            {comments.map((comm) => {
              console.log(comm.comment);
              console.log(comm);
              return (
                <>
                  <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Michael Gough"
                          />
                          {comm.user_name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time
                            pubdate
                            dateTime="2022-02-08"
                            title="February 8th, 2022"
                          ></time>
                        </p>
                      </div>

                      <div>
                        <Menu as="div" className="flex items-center">
                          <div>
                            {/* {localStorage.getItem("user_name") == comm.user_name ? ( */}
                           
                           <Menu.Button className="text-sm ">
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
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                ></path>
                              </svg>
                            </Menu.Button>
                            {/* ) : null} */}
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
                            <Menu.Items className="relative  z-10 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <span
                                    onClick={() => deleteComment(comm.id)}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block cursor-pointer  px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Delete
                                  </span>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                      {comm.comment}
                    </p>
                  </article>
                </>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Blogs;
