import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import blogReducer from "./BlogReducer";

const Blog = createContext();

const BlogContext = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, []);
  useEffect(() => {
    // axios.get("http://localhost:3001/api/v1/blogs").then((res) => {
    axios
      .get("https://blog-api-host-iskq.onrender.com/api/v1/blogs")
      .then((res) => {
        dispatch({ type: "FETCH_INIT", payload: res.data });
      });
  }, []);

  return <Blog.Provider value={{ state, dispatch }}>{children}</Blog.Provider>;
};

export const BlogState = () => {
  return useContext(Blog);
};

export default BlogContext;
