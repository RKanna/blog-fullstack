"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getBlogByID, deleteBlogById } from "../request";
import Moment from "react-moment";
import { useRouter } from "next/navigation";
import { BlogState } from "../Context/BlogContext";
import Link from "next/link";
import { useAuthContext } from "../Context/AuthContext";
import { useRef } from "react";
import { updateCommentById, updateLikesById } from "../request";
import { FaThumbsUp } from "react-icons/fa";
import axios from "axios";

const DetailedBlog = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [specificBlog, setSpecificBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { userName } = useAuthContext();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id) {
          const blog = await getBlogByID(id);
          setSpecificBlog(blog);
          setComments(blog.data.comments);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const router = useRouter();
  const { dispatch } = BlogState();
  const handleDelete = async () => {
    try {
      await dispatch({ type: "DELETE_BLOG", payload: id });
      window.alert("Deleted successfully");
      router.push("/Explore");
    } catch (error) {
      console.error("Error deleting blog:", error);
      window.alert("Failed to delete the blog post");
    }
  };

  //Function for FrontEnd Masking of Buttons
  const isAuthorizedUser = () => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId === specificBlog?.data?.userId;
  };

  // Function to add a new comment
  const handleAddComment = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        window.alert("User ID is missing");
        return;
      }

      const blogId = specificBlog?.data?._id;

      if (!blogId) {
        window.alert("Blog ID is missing");
        return;
      }

      const response = await fetch(
        // `http://localhost:3001/api/v1/blogs/${specificBlog?.data?._id}/comments`,
        `https://blog-api-host-iskq.onrender.com/api/v1/blogs/${specificBlog?.data?._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newComment,
            author: userName,
            userId,
          }),
        }
      );

      const updatedBlogData = await response.json();

      if (response.ok && updatedBlogData?.data?.comments) {
        dispatch({
          type: "ADD_COMMENT",
          payload: {
            blogId: specificBlog.data._id,
            commentData: updatedBlogData.data.comments,
          },
        });

        setNewComment("");

        window.alert("Comment added successfully");
      } else {
        console.error("Error adding comment:", updatedBlogData.message);
        window.alert(`Failed to add the comment: ${updatedBlogData.message}`);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      window.alert("Failed to add the comment");
    }
  };

  //For updating the comments

  const handleUpdateComment = async (commentId, newText) => {
    try {
      console.log("Comments Array Before Update:", comments);

      const commentIndex = comments.findIndex(
        (comment) => comment.author === userName
      );

      if (commentIndex === -1) {
        window.alert("Comment not found");
        return;
      }

      console.log("Updating Comment...");

      const response = await updateCommentById(id, comments[commentIndex]._id, {
        text: newText,
        author: userName,
      });

      const updatedBlogData = await response.json();

      if (response.ok && updatedBlogData?.data?.comments) {
        dispatch({
          type: "UPDATE_COMMENT",
          payload: {
            updatedCommentData: updatedBlogData.data.comments,
          },
        });

        window.alert("Comment updated successfully");
      } else {
        console.error("Error updating comment:", updatedBlogData.message);
        window.alert(
          `Failed to update the comment: ${updatedBlogData.message}`
        );
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      window.alert("Failed to update the comment");
    }
  };

  //for Deleting

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        // `http://localhost:3001/api/v1/blogs/${specificBlog?.data?._id}/comments/${commentId}`,
        `https://blog-api-host-iskq.onrender.com/api/v1/blogs/${specificBlog?.data?._id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const deletedCommentData = await response.json();

      if (response.ok && deletedCommentData?.data?.comments) {
        dispatch({
          type: "DELETE_COMMENT",
          payload: {
            blogId: specificBlog?.data?._id,
            commentId,
          },
        });

        window.alert("Comment deleted successfully");
      } else {
        console.error("Error deleting comment:", deletedCommentData.message);
        window.alert(
          `Failed to delete the comment: ${deletedCommentData.message}`
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      window.alert("Failed to delete the comment");
    }
  };

  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef();
  const openModal = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComment(null);
    setIsModalOpen(false);
  };

  comments.forEach((comment) => {
    console.log(comment.author);
  });

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchUpdatedBlog = async () => {
      try {
        if (id) {
          const updatedBlog = await getBlogByID(id);
          setSpecificBlog(updatedBlog);
        }
      } catch (error) {
        console.error("Error fetching updated blog:", error);
      }
    };
    fetchUpdatedBlog();
  }, [isLiked]);

  const handleLike = async () => {
    try {
      const likes = specificBlog.data.likes;
      const newLikes = isLiked ? likes - 1 : likes + 1;
      setIsLiked(!isLiked);
      await updateLikesById(specificBlog.data._id, newLikes);
      const updatedBlog = await getBlogByID(id);
      setSpecificBlog(updatedBlog);
    } catch (error) {
      console.error("Error updating likes:", error);
      window.alert("Failed to update likes");
    }
  };

  return (
    <section className="relative min-h-screen pt-10 pb-10 lg:w-3/4 lg:mx-auto">
      {specificBlog && specificBlog.data ? (
        <div className="flex flex-col items-center justify-center">
          <div className="relative pb-4 flex flex-col items-center justify-center pl-[2rem] pr-[2rem] text-justify">
            <div className="relative overflow-hidden rounded-xl">
              <img
                className="w-full h-auto rounded-xl min-set lg:min-w-[70rem]"
                src={specificBlog.data.image}
                alt=""
              />

              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-xl"></div>

              <h1 className="absolute z-10 text-white underline transform -translate-x-1/2 -translate-y-1/2 lg:text-4xl sm:text-xl top-1/2 left-1/2 whitespace-nowrap">
                {specificBlog.data.title}
              </h1>
              <h3 className="absolute z-10 lg:text-2xl text-white transform -translate-x-1/2 -translate-y-1/2 top-[60%] left-1/2 whitespace-nowrap">
                Author: {specificBlog.data.author}
              </h3>
            </div>

            <div className="mt-6">
              <p className="text-white lg:text-2xl">
                <span className="text-3xl text-white lg:text-6xl md:text-4xl">
                  {specificBlog.data.content.charAt(0)}
                </span>
                {specificBlog.data.content.slice(1)}
              </p>
            </div>
            <div className="flex flex-col items-center " onClick={handleLike}>
              <FaThumbsUp
                className={
                  isLiked
                    ? "text-blue-500 text-4xl cursor-pointer"
                    : "text-white text-4xl cursor-pointer"
                }
              />
              <p className="text-white">{specificBlog.data.likes}</p>
            </div>
            <div className="flex flex-col items-center justify-between w-full pb-10">
              <p className="pt-3 text-white">
                Published: {`${" "}`}
                <Moment format="ddd Do YYYY">
                  {specificBlog.data.datePublished}
                </Moment>
              </p>

              <p className="pt-3 text-white">
                Category: {specificBlog.data.tags}
              </p>
            </div>

            <div className="pt-2">
              {isAuthorizedUser() && (
                <>
                  <button
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <Link
                    href={{
                      pathname: `Update/${specificBlog.data._id}`,
                      query: { id: specificBlog.data._id },
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Update
                  </Link>
                </>
              )}
            </div>
            <div className="flex flex-col justify-start w-full mt-10">
              <h1 className="my-4 text-4xl text-white ">Comments</h1>
              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

              <div>
                {specificBlog.data.comments.length > 0 ? (
                  specificBlog.data.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="flex flex-col w-full p-8 mb-3 bg-gray-800 lg:w-3/4 rounded-xl"
                    >
                      <div className="flex justify-between">
                        <h5 className="text-white">
                          <Moment format="ddd Do YYYY">{comment.date}</Moment>
                        </h5>
                        <h4 className="text-white">{comment.author}</h4>
                      </div>

                      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                      <div className="flex flex-col w-3/4 p-8 mt-2 bg-white rounded-xl">
                        <h3>{comment.text}</h3>
                      </div>

                      <div className="flex justify-between mt-3">
                        {comment.author === userName && (
                          <>
                            <button
                              className="p-3 font-semibold text-black transition-all duration-300 ease-in-out hover:text-white bg-give rounded-xl"
                              onClick={() => openModal(comment)}
                            >
                              Update
                            </button>
                            <button
                              className="p-3 font-semibold text-black transition-all duration-300 ease-in-out hover:text-white bg-give rounded-xl"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-white">No comments found</div>
                )}
              </div>

              {/* ////////////////////////////////////////////// */}
              {isModalOpen && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                  <div ref={modalRef} className="p-8 bg-white rounded-md">
                    <textarea
                      value={selectedComment?.text || ""}
                      onChange={(e) =>
                        setSelectedComment({
                          ...selectedComment,
                          text: e.target.value,
                        })
                      }
                      placeholder="Update comment..."
                      className="w-full h-40 p-2 border"
                    ></textarea>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => closeModal()}
                        className="px-4 py-2 mr-2 bg-gray-400 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateComment(
                            selectedComment?._id,
                            selectedComment?.text
                          )
                        }
                        className="px-4 py-2 text-white bg-green-500 rounded-md"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* ////////////////////////////////////////////// */}
              <h1 className="my-4 text-4xl text-white ">Add Comments</h1>
              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <main className="flex flex-col w-full p-8 mb-3 bg-gray-800 lg:w-3/4 rounded-xl">
                <textarea
                  name="comments"
                  id="comments"
                  cols="30"
                  rows="10"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-[5rem] dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:text-2xl mb-4"
                  placeholder="comments"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <div>
                  <button
                    className="p-3 font-semibold text-black transition-all duration-300 ease-in-out hover:text-white bg-give rounded-xl"
                    type="submit"
                    onClick={handleAddComment}
                  >
                    Submit
                  </button>
                </div>
              </main>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center" role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </section>
  );
};

export default DetailedBlog;

//////////////////////////////////////////////////////////////////////
