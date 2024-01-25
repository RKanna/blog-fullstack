"use client";
export const getBlogByID = async (id) => {
  const res = await fetch(`http://localhost:3001/api/v1/blogs/${id}`);
  // const res = await fetch(
  //   `https://blog-api-host-iskq.onrender.com/api/v1/blogs/${id}`
  // );
  const data = await res.json();
  console.log(data);
  return data;
};

export const deleteBlogById = async (id) => {
  const res = await fetch(`http://localhost:3001/api/v1/blogs/${id}`, {
    // const res = await fetch(
    //   `https://blog-api-host-iskq.onrender.com/api/v1/blogs/${id}`,
    //   {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error deleting blog:", errorData);
    throw new Error("Error deleting blog");
  }
  const data = await res.json();
  console.log("Blog deleted successfully:", data);
  return data;
};

// updateComment by id

export const updateCommentById = async (blogId, commentId, updatedData) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/blogs/${blogId}/comments/${commentId}`,
      // `https://blog-api-host-iskq.onrender.com/api/v1/blogs/${blogId}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    return response;
  } catch (error) {
    throw new Error("Error updating comment:", error);
  }
};
//for getting likes
export const updateLikesById = async (blogId, newLikes) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/blogs/${blogId}/likes`,
      // `https://blog-api-host-iskq.onrender.com/api/v1/blogs/${blogId}/likes`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: newLikes,
        }),
      }
    );

    const updatedBlogData = await response.json();

    if (!response.ok) {
      console.error("Error updating likes:", updatedBlogData.message);
      throw new Error(`Failed to update likes: ${updatedBlogData.message}`);
    }
  } catch (error) {
    console.error("Error updating likes:", error);
    throw new Error("Failed to update likes");
  }
};
