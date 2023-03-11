import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories ,setCategories] = useState([])
  const [blogs, setBlogs] = useState({
    title: "",
    description: "",
    category: "",
    // user_id: "",
  });
  const [errorMessage, setErrorMessage] = useState({});

  const setError = (field, msg) => {
    setErrorMessage({
      ...errorMessage,
      [field]: msg,
    });
  };
  const getEditBlog = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/api/singleBlog/${id}`)
        .then((res) => {
          console.log(res.data);
          setBlogs(res.data);
        });

      // alert("plz check the fields")
    } catch (error) {
      // console.log(error.response.data.errors);
      //   setError(error.response.data.errors)
      console.log(error);
    }
  };

  useEffect(() => {
    getEditBlog();
  }, []);

  const handleImage = (e) => {
    setBlogs({ ...blogs, image: e.target.files[0] });
  };

  const blogUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", blogs.title);
      formData.append("description", blogs.description);
      formData.append("category", blogs.category);
      //   formData.append("user_id", blogs.user_id);
      formData.append("image", blogs.image);
      await axios
        .post("http://127.0.0.1:8000/api/updateBlog/" + id, formData)
        .then((res) => {
          console.log(res);
          // console.log(res.data);
          // console.log(res.data.id)
          // console.log("res,", formData);
          navigate("/");
        });

      // alert("plz check the fields")
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

  const fetchCatogories = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/allCategory`)
        .then((res) => {
          console.log(res.data);
          setCategories(res.data);
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
  return (
    <>
      <Nav />
      <div className=" h-2/3 bg-slate-700">
        <div className="flex h-2/3 bg-slate-300">
          <div
            className="w-1/2 bg-cover md:block hidden"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y3JlYXRlJTIwYmxvZyUyMGFwcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60)",
            }}
          />
          {/* <div class="bg-no-repeat bg-right bg-cover max-w-max max-h-8 h-12 overflow-hidden">
        <img src="log_in.webp" alt="hey">
    </div> */}
          <div className="md:w-1/2 max-w-lg mx-auto my-24 px-4 py-5 shadow-none">
            <div className="text-left p-0 font-sans">
              <h1 className=" text-gray-800 text-3xl font-medium">
                Update Your blog
              </h1>
              <h3 className="p-1 text-gray-700">
                This makes your memories alive...
              </h3>
            </div>
            <form encType="multipart/form-data" action="#" className="p-0">
              <div className="mt-5">
                <input
                  type="text"
                  className="block w-full p-2 border rounded focus:outline-none ring-1 ring-gray-400 border-transparent "
                  placeholder="Title"
                  value={blogs.title}
                  onChange={(event) =>
                    setBlogs({ ...blogs, title: event.target.value })
                  }
                />
              <p className="text-red-600 ml-2 text-xs">{errorMessage.title}</p>

              </div>
              <div className="mt-5">
                <textarea
                  type="text"
                  className="block w-full p-2 border rounded focus:outline-none ring-1 ring-gray-400 border-transparent "
                  placeholder="description"
                  value={blogs.description}
                  onChange={(event) =>
                    setBlogs({ ...blogs, description: event.target.value })
                  }
                />
              <p className="text-red-600 ml-2 text-xs">{errorMessage.description}</p>

              </div>

              <div className="mt-5">
                <input
                  type="file"
                  name="image"
                  onChange={handleImage}
                  className="block w-full bg-slate-50 p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 file-input file-input-warning ring-gray-400 border-transparent "
                />
              <p className="text-red-600 ml-2 text-xs">{errorMessage.image}</p>

              </div>
              <div className="mt-5">
            
                <select className="block w-full px-2 py-3 capitalize border rounded focus:outline-none ring-1 ring-gray-400 border-transparent"
                 value={blogs.category}
                 onChange={(event) =>
                   setBlogs({ ...blogs, category: event.target.value })
                 }
                >
                  {categories.map((elements) => {
                    return (
                      <>
                        <option hidden>Choose Your Category</option>
                        <option className="capitalize">{elements.category}</option>
                      </>
                    );
                  })}
                </select>
                <p className="text-red-600 ml-2 text-xs">
                  {errorMessage.category}
                </p>
              </div>
              {/* <input type="text" value={user_id} /> */}

              <div className="mt-10">
                <button
                  type="submit"
                  onClick={blogUpdate}
                  className="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
