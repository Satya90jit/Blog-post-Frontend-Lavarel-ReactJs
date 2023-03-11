import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./SignUpNav/Nav";
import { useParams } from "react-router-dom";

const BlogCreateForm = () => {
  const params = useParams();
  const user_id = localStorage.getItem("user_id");
  console.log(user_id);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [blogs, setBlogs] = useState(
    JSON.parse(localStorage.getItem("blogs")) || []
  );
  const [errorMessage, setErrorMessage] = useState({});

  const setError = (field, msg) => {
    setErrorMessage({
      ...errorMessage,
      [field]: msg,
    });
  };

  const blogCreate = async (e) => {
    e.preventDefault();
    const newBlogs = [...blogs, blog];
    setBlogs(newBlogs);
    localStorage.setItem("blogs", JSON.stringify(newBlogs));

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("description", blog.description);
      formData.append("category", blog.category);
      formData.append("image", blog.image);
      await axios
        .post("http://127.0.0.1:8000/api/createBlog/" + user_id, formData)
        .then((res) => {
          console.log(res);

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
  const handleImage = (e) => {
    setBlog({ ...blog, image: e.target.files[0] });
  };

  const fetchCatogories = async () => {
    try {
      await axios.get(`http://localhost:8000/api/allCategory`).then((res) => {
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
      <div className=" min-h-full bg-slate-700">
        <div className="flex bg-slate-300">
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
                Create Your blog
              </h1>
              <h3 className="p-1 text-gray-700">
                This makes your memories alive...
              </h3>
            </div>
            <form encType="multipart/form-data" action="#" className="p-0">
              <div className="mt-5">
                <input
                  //  style={{border:".1px solid #555"}}

                  type="text"
                  className="block w-full p-2 border rounded focus:outline-none ring-1 ring-gray-400 border-transparent "
                  placeholder="Title"
                  value={blog.title}
                  onChange={(event) =>
                    setBlog({ ...blog, title: event.target.value })
                  }
                />
                <p className="text-red-600 ml-2 text-xs">
                  {errorMessage.title}
                </p>
              </div>
              <div className="mt-5">
                <textarea
                  //  style={{border:".1px solid #555"}}
                  type="text"
                  className="block w-full p-2 border rounded focus:outline-none ring-1 ring-gray-400 border-transparent "
                  placeholder="description"
                  value={blog.description}
                  onChange={(event) =>
                    setBlog({ ...blog, description: event.target.value })
                  }
                />
                <p className="text-red-600 ml-2 text-xs">
                  {errorMessage.description}
                </p>
              </div>

              <div className="mt-5">
                <input
                  //  style={{border:".1px solid #555"}}

                  type="file"
                  name="image"
                  onChange={handleImage}
                  className="block w-full bg-slate-50 p-2 border rounded border-gray-300 focus:outline-none ring-1 file-input file-input-warning ring-gray-400 border-transparent "
                />
                <p className="text-red-600 ml-2 text-xs">
                  {errorMessage.image}
                </p>
              </div>

              <div className="mt-5">
                <select
                  //  style={{border:".001px solid #555"}}

                  className="block w-full py-3 px-2  border rounded focus:outline-none ring-1 ring-gray-400 border-transparent  "
                  value={blog.category}
                  onChange={(event) =>
                    setBlog({ ...blog, category: event.target.value })
                  }
                >
                  {categories.map((elements) => {
                    return (
                      <>
                        <option hidden>Choose Your Category</option>
                        <option>{elements.category}</option>
                      </>
                    );
                  })}
                </select>
                <p className="text-red-600 ml-2 text-xs">
                  {errorMessage.category}
                </p>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  onClick={blogCreate}
                  className="py-3 bg-green-600 text-white w-full rounded hover:bg-green-600"
                >
                  Create Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCreateForm;
