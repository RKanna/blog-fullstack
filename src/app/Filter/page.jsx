// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const FilterPage = () => {
//   const router = useRouter();
//   const { author } = router.query;

//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     if (author) {
//       const fetchBlogs = async () => {
//         try {
//           const response = await fetch(
//             `/api/v1/blog/filter?author=${encodeURIComponent(author)}`
//           );
//           if (response.ok) {
//             const data = await response.json();
//             setBlogs(data.data);
//           } else {
//             console.error("Failed to fetch blogs");
//           }
//         } catch (error) {
//           console.error("Error fetching blogs:", error);
//         }
//       };

//       fetchBlogs();
//     }
//   }, [author]);

//   return (
//     <section className="flex flex-col min-h-screen tech-blur">
//       <h1 className="mb-4 text-3xl">Blogs by {author || "Author"}</h1>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {blogs.map((blog) => (
//           <div key={blog._id} className="p-4 bg-white rounded-md shadow-md">
//             <h2 className="mb-2 text-xl font-bold">{blog.title}</h2>
//             <p className="text-gray-700">{blog.content}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FilterPage;
