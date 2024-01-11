"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getBlogByID } from "../../request.js";
import { BlogState } from "../../Context/BlogContext.jsx";
import FileBase64 from "react-file-base64";

const Update = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    tags: "",
    image: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id) {
          const blog = await getBlogByID(id);
          setBlogData({
            title: blog.data.title || "",
            content: blog.data.content || "",
            tags: blog.data.tags.join(",") || "",
            image: blog.data.image || "",
          });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const { dispatch } = BlogState();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const blogToUpdate = await getBlogByID(id);
      const alreadyExistingImage = blogToUpdate.data.image;
      const updatedBlog = {
        _id: id,
        title: blogData.title,
        content: blogData.content,
        tags: blogData.tags,
        image: blogData.image || alreadyExistingImage,
      };
      await dispatch({ type: "UPDATE_BLOG", payload: updatedBlog });

      window.alert("Updated successfully");
      // router.push("/Explore");
    } catch (error) {
      console.error("Error updating blog:", error);
      window.alert("Failed to update the blog post");
    }
  };

  return (
    <section className="w-full min-h-screen mx-auto sm:w-3/4 md:w-1/2 lg:w-1/2">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            required
            value={blogData.title}
            onChange={(e) =>
              setBlogData({ ...blogData, title: e.target.value })
            }
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name=""
            cols="30"
            rows="10"
            placeholder="Blog Content"
            required
            value={blogData.content}
            onChange={(e) =>
              setBlogData({ ...blogData, content: e.target.value })
            }
          ></textarea>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-[5rem] dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tags Separated by coma"
            value={blogData.tags}
            onChange={(e) => setBlogData({ ...blogData, tags: e.target.value })}
            name="tags"
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
            value={blogData.image}
            className="form-control"
            onDone={({ base64 }) => setBlogData({ ...blogData, image: base64 })}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleUpdate}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Update;
