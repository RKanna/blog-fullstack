import blogReducer from "./blogReducer";
import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const Blog = createContext();

const BlogContext = ({ children }) => {
  // useEffect(() => {
  //   axios.get("http://localhost:3001/api/v1/blogs").then((res) => {
  //     dispatch({ type: "FETCH_INIT", payload: res.data });
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/blogs");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        dispatch({ type: "FETCH_INIT", payload: data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [state, dispatch] = useReducer(blogReducer, []);
  // console.log(state);
  return <Blog.Provider value={{ state, dispatch }}>{children}</Blog.Provider>;
};

export const BlogState = () => {
  return useContext(Blog);
};

export default BlogContext;
