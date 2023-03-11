import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Comments = () => {
  const [comments, setcomments] = useState([]);

  const showComment = async (e) => {
    try {
      await axios.get("http://localhost:8000/api/getBlogComments/1").then((res) => {
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
  return (
    <>
      {comments.map((comm) => {
        console.log(comm.comment);
        return (
          <>
            {/* <h1>{comm.comment}</h1>
            <p>{comm.id}</p>
            <p>{comm.blog_id}</p> */}
            <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough"
                    />
                    Michael Gough
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      pubdate
                      dateTime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      Feb. 8, 2022
                    </time>
                  </p>
                </div>
               
                <div>
              

                  <Menu as="div" className="flex items-center">
                    <div>
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
                              // onClick={() => deleteBlog(elements.id)}
                              className={classNames(
                                active ? "bg-gray-100" : "cursor-pointer",
                                "block cursor-pointer px-4 py-2 text-sm text-gray-700"
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
              <p className="text-gray-500 dark:text-gray-400">{comm.comment}</p>
            </article>
          </>
        );
      })}
    </>
  );
};

export default Comments;
