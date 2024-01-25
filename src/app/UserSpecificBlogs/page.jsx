"use client";
import React from "react";
import { useAuthContext } from "../Context/AuthContext";
import { BlogState } from "../Context/BlogContext";
import Link from "next/link";
import Moment from "react-moment";
import { useState } from "react";
import { getProfileIdFromLocalStorage } from "../Createblog/LocalStorageGet";

const Filter = () => {
  const { userId, userName } = useAuthContext();
  const { state } = BlogState();
  //   const localStorageUserId = localStorage.getItem("userId");

  if (userId !== getProfileIdFromLocalStorage()) {
    return (
      <div className="w-full min-h-screen text-white">
        You do not have permission to view these blogs.
      </div>
    );
  }

  const filteredBlogs = state.filter((blog) => blog.userId === userId);

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div
        role="status"
        className="flex items-center justify-center min-h-screen"
      >
        <svg
          aria-hidden="true"
          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  if (filteredBlogs.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen text-4xl text-white">
        No matching blogs found.
      </div>
    );
  }

  return (
    <section className="min-h-screen p-5 ">
      <h2 className="text-4xl text-center text-white">{userName} Blog List</h2>
      <ul className="flex flex-col items-center justify-center mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4">
        <div className="flex flex-col">
          {filteredBlogs.map((blog) => (
            <Link
              href={{
                pathname: `/${blog._id}`,
                query: { id: blog._id },
              }}
              key={blog._id}
              className="flex w-full h-full gap-3 p-10 mt-5 overflow-hidden text-gray-700 bg-blue-200 bg-center bg-no-repeat bg-cover rounded-lg shadow-md cursor-pointer overflow-ellipsis bg-clip-border sm:bg-cover lg:bg-blue-100 test-bg"
              style={{
                backgroundImage: `url(${blog.image})`,
              }}
            >
              <div className="hidden lg:flex md:flex lg:w-3/4">
                <img
                  className="rounded-xl img-card"
                  src={blog.image}
                  alt={blog.title}
                />
              </div>
              <div className="lg:w-[200%]">
                {/* <h3 className="pb-5 text-4xl text-black">{blog.title}</h3> */}
                <div className="flex flex-col items-center p-3 bg-gray-500 rounded-lg shadow-lg bg-give bg-clip-border">
                  <h3 className="p-2 text-4xl text-black ">{blog.title}</h3>
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <p className="p-2 text-xl text-justify text-black bg-blue-300 rounded-lg lg:bg-transparent lg:p-0 lg:rounded-none">
                  {blog.shortDescription}
                </p>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between gap-2 pt-2 whitespace-nowrap">
                  <Moment
                    format="ddd Do YYYY"
                    className="p-2 text-black shadow-xl bg-give-two rounded-xl bg-clip-border"
                  >
                    {blog.datePublished}
                  </Moment>
                  <p className="p-2 text-black shadow-xl bg-give-two rounded-xl bg-clip-border">
                    Author : {blog.author}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ul>
    </section>
  );
};

export default Filter;
