"use client";
import axios from "axios";
const blogReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      // console.log(action);
      return action.payload.data;

    case "CREATE_BLOG":
      // axios.post("http://localhost:3001/api/v1/blogs", action.payload);
      axios.post(
        "https://blog-api-host-iskq.onrender.com/api/v1/blogs",
        action.payload
      );
      // Fetch the updated list of blogs from the server
      // axios.get("http://localhost:3001/api/v1/blogs").then((res) => {
      axios
        .get("https://blog-api-host-iskq.onrender.com/api/v1/blogs")
        .then((res) => {
          dispatch({ type: "FETCH_INIT", payload: res.data });
        });

      return state;

    case "UPDATE_BLOG":
      axios.put(
        // `http://localhost:3001/api/v1/blogs/${action.payload._id}`,
        `https://blog-api-host-iskq.onrender.com/api/v1/blogs/${action.payload._id}`,
        action.payload
      );
      return state.map((blog) =>
        blog._id === action.payload._id ? action.payload : blog
      );
    case "DELETE_BLOG":
      // axios.delete(`http://localhost:3001/api/v1/blogs/${action.payload}`);
      axios.delete(
        `https://blog-api-host-iskq.onrender.com/api/v1/blogs/${action.payload}`
      );
      return state.filter((blog) => blog._id !== action.payload);

    case "ADD_COMMENT":
      const { blogId, commentData } = action.payload;
      // axios.post(
      //   `http://localhost:3001/api/v1/blogs/${blogId}/comments`,
      //   commentData
      // );
      return state.map((blog) =>
        blog._id === blogId
          ? { ...blog, comments: [...blog.comments, commentData] }
          : blog
      );

    case "UPDATE_COMMENT": {
      const { updatedCommentData } = action.payload;
      const updatedState = state.map((blog) => {
        const updatedComments = blog.comments.map((comment) =>
          comment._id === updatedCommentData._id ? updatedCommentData : comment
        );
        return blog._id === updatedCommentData.blogId
          ? { ...blog, comments: updatedComments }
          : blog;
      });
      return updatedState;
    }
    case "DELETE_COMMENT": {
      const { blogId, commentId } = action.payload;
      return state.map((blog) =>
        blog._id === blogId
          ? {
              ...blog,
              comments: blog.comments.filter((c) => c._id !== commentId),
            }
          : blog
      );
    }
    case "UPDATE_LIKES":
      return state.map((blog) =>
        blog._id === action.payload.blogId
          ? { ...blog, likes: action.payload.likes }
          : blog
      );

    default:
      return state;
  }
};

export default blogReducer;
