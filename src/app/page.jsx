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
    <section className="min-h-screen p-5">
      <h2 className="text-4xl text-center">Recent Blog List</h2>
      <ul className="flex flex-col items-center justify-center mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4">
        {sortedBlogs.map((blog) => (
          <Link
            href={{
              pathname: `/${blog._id}`,
              query: { id: blog._id },
            }}
            key={blog._id}
            className="p-10 mt-5 overflow-hidden bg-blue-200 rounded-lg cursor-pointer overflow-ellipsis"
          >
            <h3 className="pb-5 text-4xl">{blog.title}</h3>
            <p className="text-xl text-justify">{blog.shortDescription}</p>
            <div className="flex justify-between gap-2 pt-2 whitespace-nowrap">
              <Moment format="ddd Do YYYY">{blog.datePublished}</Moment>
              <p>Author : {blog.author}</p>
            </div>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Home;
