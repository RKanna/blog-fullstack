"use client";
import React from "react";
import FileBase64 from "react-file-base64";
import { BlogState } from "../Context/BlogContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../Context/AuthContext";
import { getProfileIdFromLocalStorage } from "./LocalStorageGet";

const CreateBlog = () => {
  const router = useRouter();

  const [profileId, setProfileId] = useState("");

  const { userName } = useAuthContext();

  // useEffect(() => {
  //   const getProfileId = localStorage.getItem("userId");

  //   setProfileId(getProfileId);
  //   if (getProfileId) {
  //     router.push("/Createblog");
  //   } else {
  //     router.push("/");
  //   }
  // }, []);

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const userId = localStorage.getItem("userId");
  //     setCreatePost({
  //       ...createPost,
  //       userId: userId,
  //     });

  //     console.log(createPost);
  //     await dispatch({ type: "CREATE_BLOG", payload: createPost });
  //     window.alert("Post created successfully");
  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error("Error creating blog:", error);
  //     window.alert("Failed to create the blog post");
  //   }
  // };

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
        await dispatch({ type: "CREATE_BLOG", payload: createPost });
        window.alert("Post created successfully");
        router.push("/"); // Use router.push instead of window.location.href
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      window.alert("Failed to create the blog post");
    }
  };

  return (
    // <section className="w-full min-h-screen mx-auto mt-10 mb-10 sm:w-3/4 md:w-1/2 lg:w-1/2">
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
            // onChange={(e) =>
            //   setCreatePost({ ...createPost, author: e.target.value })
            // }
            // value={createPost.author}
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

        {/* <div className="mb-5">
          <label
            htmlFor="likes"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Likes
          </label>
          <input
            type="number"
            id="likes"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-[5rem] dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:text-2xl"
            placeholder="likes"
            onChange={(e) =>
              setCreatePost({ ...createPost, likes: +e.target.value })
            }
            value={createPost.likes}
            name="tags"
            // required
          />
        </div> */}
        {/* <div className="mb-5">
          <label
            htmlFor="comments"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Comments
          </label>

          <textarea
            name="comments"
            id="comments"
            cols="30"
            rows="10"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-[5rem] dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:text-2xl"
            placeholder="comments"
            value={createPost.comments[0]?.text || ""}
            onChange={(e) =>
              setCreatePost({
                ...createPost,
                comments: [
                  {
                    text: e.target.value,
                    author: createPost.author,
                    date: new Date().toISOString(),
                  },
                ],
              })
            }
          ></textarea>
        </div> */}

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
