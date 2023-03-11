import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Nav from "./SignUpNav/Nav";
import { useNavigate } from "react-router-dom";

const ShowCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

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

  const showCategoryBlogs = (e) => {
    const selectedOptionId = e.target.value;
    console.log(selectedOptionId);
    navigate("/filterBlogs/" + selectedOptionId);
  };

  // const style = {
  // backgroundColor: index % 2 === 0 ? '#ccc' : '#eee',
  // display: 'block',
  // padding: '10px',
  // marginBottom: '10px',
  // };




  return (
    <>
      {/* <Nav/> */}
      <select
        onChange={showCategoryBlogs}
        className="block w-56 p-3 bg-white border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
      >
        {categories.map((elements, index) => {
          return (
            <>
              <option hidden>Explore Blogs</option>
              <option
                className="capitalize"
                key={elements.id}
                value={elements.id}
              >
                {elements.category}
              </option>
            </>
          );
        })}
      </select>
    </>
  );
};

export default ShowCategories;
