// import {
//   createContext,
//   useContext,
//   useReducer,
//   useEffect,
//   useState,
// } from "react";
// import blogReducer from "./BlogReducer";
// import axios from "axios";

// const Blog = createContext();

// const BlogContext = ({ children }) => {
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/v1/blog").then((res) => {
//       dispatch({ type: "FETCH_INIT", payload: res.data });
//     });
//   }, []);

//   const [state, dispatch] = useReducer(blogReducer, {});
//   //   console.log(state);
//   return <Blog.Provider value={{ state, dispatch }}>{children}</Blog.Provider>;
// };

// export const BlogState = () => {
//   return useContext(Blog);
// };

// export default BlogContext;

//////////////////////////////////////////////////

import { createContext, useContext, useState, useEffect } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <BlogContext.Provider
      value={{
        title,
        setTitle,
        content,
        setContent,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  return useContext(BlogContext);
};
