"use client";
export const getBlogByID = async (id) => {
  const res = await fetch(`http://localhost:3001/api/v1/blogs/${id}`);
  const data = await res.json();
  console.log(data);
  return data;
};

export const deleteBlogById = async (id) => {
  const res = await fetch(`http://localhost:3001/api/v1/blogs/${id}`, {
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
