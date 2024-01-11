"use client";
import React from "react";
import { BlogState } from "./Context/BlogContext";
import Link from "next/link";
import Moment from "react-moment";

const Home = () => {
  const { state } = BlogState();
  const sortedBlogs = state.sort(
    (a, b) => new Date(b.datePublished) - new Date(a.datePublished)
  );

  return (
    <section className="min-h-screen p-5 ">
      <h2 className="text-4xl text-center text-white">Recent Blog List</h2>
      <ul className="flex flex-col items-center justify-center mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4">
        <div className="flex flex-col">
          {sortedBlogs.map((blog) => (
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

export default Home;
