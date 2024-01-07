import { createContext, useContext, useReducer, useEffect } from "react";
import blogReducer from "./blogReducer";
import axios from "axios";

const Blog = createContext();

const BlogContext = ({ children }) => {
  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/blogs").then((res) => {
      dispatch({ type: "FETCH_INIT", payload: res.data });
    });
  }, []);

  const [state, dispatch] = useReducer(blogReducer, []);
  // console.log(state);
  return <Blog.Provider value={{ state, dispatch }}>{children}</Blog.Provider>;
};

export const BlogState = () => {
  return useContext(Blog);
};


export default BlogContext;
