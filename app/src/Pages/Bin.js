import React, { useState } from "react";
import Nav from "./SignUpNav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogCreateForm = () => {
    const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    // id: "",
    title: "",
    description: "",
    category: "",
    image: "",
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setBlogData({ ...blogData, [name]: value });
  };

  const creatBlog = async () => {
    // event.preventDefault();
    // employeeData.append('image', profile);
    // console.log(profile)
    // const config={headers:{'content-type':'multipart/form-data'},};

    // const formData = new FormData();
    // formData.append("Full_Name", blogData.title);
    // formData.append("Email_Address", blogData.description);
    // formData.append("Status", blogData.category);
    // formData.append("Status", blogData.image);
    // formData.append("image", blogData.image);

    try {
      await axios
        .post("http://127.0.0.1:8000/api/createBlog")
        .then((res) => {
          console.log(res);
        //   console.log("res,", formData);
        //   navigate("/");
        });

      // alert("plz check the fields")
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  return (
    <>
      <Nav />
      <div className="py-12 bg-slate-500 h-full">
        <h1 className="text-white mb-5 text-center font-medium text-4xl">
          Crete Blog{" "}
        </h1>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <form method="POST" action="action.php">
                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="title"
                    id="title"
                    placeholder="Title will be here"
                    value={blogData["title"]}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">Description</label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="description"
                    id="description"
                    placeholder="Enter blog description in short"
                    value={blogData["description"]}
                    onChange={handleOnchange}
                  />
                </div>
                <label className="text-xl text-gray-600">
                  Choose Blog Category <span className="text-red-500">*</span>
                </label>
                <select
                  className="border-2 mt-3 border-gray-300 p-2 w-full"
                  name=""
                  id=""
                >
                  <option
                    selected
                    hidden
                    className="border-2 border-gray-300 p-2 w-full"
                    value="choose the blog category"
                  >
                    Choose blog category
                  </option>
                  <option
                    className="border-2 border-gray-300 p-2 w-full"
                    value="choose the blog category"
                  >
                    Food
                  </option>
                  <option
                    className="border-2 border-gray-300 p-2 w-full"
                    value="choose the blog category"
                  >
                    Technology
                  </option>
                  <option
                    className="border-2 border-gray-300 p-2 w-full"
                    value="choose the blog category"
                  >
                    Travel
                  </option>
                </select>

                <div className="flex p-1">
                  <button
                    role="submit"
                    className="px-4 mt-9 py-2 rounded-xl text-white m-0 bg-slate-800 hover:bg-red-600 transition"
                    required
                    onClick={creatBlog}
                  >
                    create blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCreateForm;



// comment -------------------------------------------------------
<div>
<div className="flex overflow-hidden justify-center h-screen items-center bg-gray-200 antialiased">
  <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
    <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
      <p className="font-semibold text-gray-800">
        Write your comment
      </p>
      <svg
        onClick={closeComment}
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div className="flex flex-col px-6 py-5 bg-gray-50">
      <p className="mb-2 font-semibold text-gray-700">comment box</p>
      <textarea
        type="text"
        name
        placeholder="Type message..."
        className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-36"
        value={blog.comment}
  onChange={event => setBlog({...blog, comment:event.target.value})}
        defaultValue={""}
      />
          <textarea
        type="text"
        name
        placeholder="Type message..."
        className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-36"
        value={blog.blog_id}
  onChange={event => setBlog({...blog, blog_id:event.target.value})}
        defaultValue={""}
      />

      <hr />
    </div>
    <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
      {/* <p  className="font-semibold text-gray-600">Cancel</p> */}
      <button
        onClick={closeComment}
        className="px-4 text-black py-2 font-semibold  rounded"
      >
        Cancel
      </button>
      <button
        onClick={createComment}
        className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
      >
        Add Comment
      </button>
    </div>
 
  </div>
</div>
</div>
{showModal ? (
  <>
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">General Info</h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setShowModal(false)}
            >
              <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                x
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
              <label className="block text-black text-sm font-bold mb-1">
                First Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
              <label className="block text-black text-sm font-bold mb-1">
                Last Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
              <label className="block text-black text-sm font-bold mb-1">
                Address
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
              <label className="block text-black text-sm font-bold mb-1">
                City
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
            </form>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
) : null}