import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AboutUs from "./Pages/AboutUs";
import AdminDashboard from "./Pages/AdminDashboard";
import BlogCreateForm from "./Pages/BlogCreateForm";
import Blogs from "./Pages/Blogs";
import Comments from "./Pages/Comments";
import ErrorPage from "./Pages/ErrorPage";
import FilterBlogs from "./Pages/FilterBlogs";
import Home from "./Pages/Home";
import Protected from "./Pages/Protected";
import ShowBlogs from "./Pages/ShowBlogs";
import ShowCategories from "./Pages/ShowCategories";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import EditBlog from "./Pages/SignUpNav/EditBlog";
import UserProfile from "./Pages/UserProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="ShowCategories" element={<ShowCategories />} />
          <Route path="filterBlogs/:id" element={<FilterBlogs />} />
          <Route path="blogs/:id" element={<Blogs />} />

          <Route element={<Protected />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/createBlog/:id" element={<BlogCreateForm />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/showBlogs/:id" element={<ShowBlogs />} />
            <Route path="/editBlog/:id" element={<EditBlog />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
