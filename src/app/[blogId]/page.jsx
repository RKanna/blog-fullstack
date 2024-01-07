"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getBlogByID, deleteBlogById } from "../request";
import Moment from "react-moment";
import { useRouter } from "next/navigation";
import { BlogState } from "../Context/BlogContext";

const DetailedBlog = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [specificBlog, setSpecificBlog] = useState(null);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id) {
          const blog = await getBlogByID(id);
          setSpecificBlog(blog);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const router = useRouter();
  const { dispatch } = BlogState();
  const handleDelete = async (e) => {
    try {
      await dispatch({ type: "DELETE_BLOG", payload: id });
      window.alert("deleted successfully");
      router.push("/Explore");
    } catch (error) {
      console.error("Error deleting blog:", error);
      window.alert("Failed to delete the blog post");
    }
  };

  return (
    <section className="relative min-h-screen">
      {specificBlog && specificBlog.data ? (
        <div className="flex flex-col items-center justify-center">
          <div className="relative pb-4 flex flex-col items-center justify-center pl-[17rem] pr-[17rem] text-justify">
            <div className="relative overflow-hidden rounded-xl">
              <img
                className="w-full h-auto rounded-xl"
                src={specificBlog.data.image}
                alt=""
              />

              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-xl"></div>

              <h1 className="absolute z-10 text-4xl text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 whitespace-nowrap">
                {specificBlog.data.title}
              </h1>
              <h3 className="absolute z-10 text-2xl text-white transform -translate-x-1/2 -translate-y-1/2 top-[60%] left-1/2 whitespace-nowrap">
                Author : {specificBlog.data.author}
              </h3>
            </div>

            <div className="mt-6">
              <p className="text-2xl">
                <span className="text-6xl">
                  {specificBlog.data.content.charAt(0)}
                </span>
                {specificBlog.data.content.slice(1)}
              </p>
              <p className="pt-3">
                Date Published : {`${" "}`}
                <Moment format="ddd Do YYYY">
                  {specificBlog.data.datePublished}
                </Moment>
              </p>
            </div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p>Loading...</p>
        </div>
      )}
    </section>
  );
};

export default DetailedBlog;
