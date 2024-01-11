"use client";
import React from "react";
import { BlogState } from "../Context/BlogContext";
import Link from "next/link";
import Moment from "react-moment";
import { useState } from "react";

const Explore = () => {
  const { state } = BlogState();

  const [searchQuery, setSearchQuery] = useState("");

  const sortedBlogs = state.sort(
    (a, b) => new Date(a.datePublished) - new Date(b.datePublished)
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBlogs = sortedBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="min-h-screen p-5 bg-blue-200">
      <div className="w-full p-2 pt-10 pb-10 mx-auto bg-gray-200 shadow-2xl lg:w-3/4 md:w-3/4 rounded-xl bg-clip-border">
        <h2 className="pb-3 text-4xl text-center">Older Blogs</h2>
        <div className="mx-auto lg:w-3/4">
          <input
            className="w-full text-xl lg:text-4xl min-h-10 lg:min-h-20 rounded-xl bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Blog Here"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <ul className="flex flex-col items-center justify-center mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4 ">
          {filteredBlogs.map((blog) => (
            <Link
              // href={`/${blog._id}`}
              href={{
                pathname: `/${blog._id}`,
                query: { id: blog._id },
              }}
              key={blog._id}
              className="p-10 mt-5 overflow-hidden text-gray-700 bg-blue-200 rounded-lg shadow-md cursor-pointer overflow-ellipsis bg-clip-border"
            >
              <div className="flex flex-col items-center p-3 bg-gray-500 rounded-lg shadow-lg bg-give bg-clip-border">
                <h3 className="p-2 text-4xl text-black ">{blog.title}</h3>
              </div>
              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <p className="text-justify ">{blog.shortDescription}</p>
              <div className="flex justify-between gap-2 pt-2 whitespace-nowrap">
                <Moment format="ddd Do YYYY">{blog.datePublished}</Moment>
                <p>Author : {blog.author}</p>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Explore;
