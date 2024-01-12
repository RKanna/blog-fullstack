import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import blogReducer from "./BlogReducer";

const Blog = createContext();

const BlogContext = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, []);
  useEffect(() => {
    // axios.get("http://localhost:3001/api/v1/blogs").then((res) => {
    axios
      .get(
        "http://ec2-13-60-12-79.eu-north-1.compute.amazonaws.com:3001/api/v1/blogs"
      )
      .then((res) => {
        dispatch({ type: "FETCH_INIT", payload: res.data });
      });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Replace the axios code with the fetch method
  //       const response = await fetch(
  //         "https://tame-pink-pike-sock.cyclic.app/api/v1/blogs"
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();

  //       // Dispatch the data to the reducer
  //       dispatch({ type: "FETCH_INIT", payload: data });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   // Call the fetchData function
  //   fetchData();
  // }, []);

  // const [state, dispatch] = useReducer(blogReducer, []);
  // console.log(state);
  return <Blog.Provider value={{ state, dispatch }}>{children}</Blog.Provider>;
};

export const BlogState = () => {
  return useContext(Blog);
};

export default BlogContext;
