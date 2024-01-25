"use client";
import React from "react";
import FileBase64 from "react-file-base64";
import { BlogState } from "../Context/BlogContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../Context/AuthContext";
import { getProfileIdFromLocalStorage } from "./LocalStorageGet";
import axios from "axios";

const CreateBlog = () => {
  const router = useRouter();

  const [profileId, setProfileId] = useState("");

  const { userName, fetchUserData, userId } = useAuthContext();
  console.log("userName:", userName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserData(userId);
        setCreatePost((prevPost) => ({
          ...prevPost,
          author: userName,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getProfileId = getProfileIdFromLocalStorage();
    setProfileId(getProfileId);
    if (getProfileId) {
      router.push("/Createblog");
    } else {
      router.push("/");
    }
  }, []);

  const [createPost, setCreatePost] = useState({
    title: "",
    content: "",
    datePublished: new Date().toISOString(),
    author: userName,
    tags: "",
    image: "",
    // comments: "",
    likes: 0,
    // userId: localStorage.getItem("userId"),
    userId:
      typeof window !== "undefined" ? localStorage.getItem("userId") : null,
  });

  const { dispatch } = BlogState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (typeof window !== "undefined") {
        const userId = getProfileIdFromLocalStorage();
        setCreatePost({
          ...createPost,
          userId: userId,
        });

        console.log(createPost);

        // First, send a request to create the new blog post
        await axios.post(
          "https://blog-api-host-iskq.onrender.com/api/v1/blogs",
          // "http://localhost:3001/api/v1/blogs",
          createPost
        );

        // After successfully creating the blog post, fetch the updated list of blogs
        const response = await axios.get(
          "https://blog-api-host-iskq.onrender.com/api/v1/blogs"
          // "http://localhost:3001/api/v1/blogs"
        );

        // Dispatch the updated list of blogs to the context
        dispatch({ type: "FETCH_INIT", payload: response.data });

        // Redirect to the home page
        window.alert("Post created successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      window.alert("Failed to create the blog post");
    }
  };

  return (
    <section className="mx-auto lg:w-3/4">
      <form action="" className="p-5">
        <h1 className="mb-3 text-2xl text-center">Create Blog</h1>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:text-2xl"
            placeholder="Title"
            required
            onChange={(e) =>
              setCreatePost({ ...createPost, title: e.target.value })
            }
            value={createPost.title}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Content
          </label>
          <textarea
            id="content"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:text-2xl"
            name=""
            cols="30"
            rows="10"
            placeholder="Blog Content"
            required
            onChange={(e) =>
              setCreatePost({ ...createPost, content: e.target.value })
            }
            value={createPost.content}
          ></textarea>
        </div>
        <div className="mb-5">
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:text-2xl"
            placeholder="Author"
            onChange={(e) =>
              setCreatePost({
                ...createPost,
                author: userName,
              })
            }
            value={userName}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-[5rem] dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:text-2xl"
            placeholder="Tags Separated by coma"
            onChange={(e) =>
              setCreatePost({ ...createPost, tags: e.target.value.split(",") })
            }
            value={createPost.tags}
            name="tags"
            // required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="cover-image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Cover Image
          </label>

          <FileBase64
            type="file"
            name="image"
            value={createPost.image}
            className="form-control lg:text-2xl"
            onDone={({ base64 }) => {
              // console.log(base64);
              setCreatePost({ ...createPost, image: base64 });
            }}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default CreateBlog;
