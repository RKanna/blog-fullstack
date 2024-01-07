"use client";
import React from "react";
import { BlogState } from "../Context/BlogContext";
import Link from "next/link";

const Explore = () => {
  const { state } = BlogState();

  const sortedBlogs = state.sort(
    (a, b) => new Date(a.datePublished) - new Date(b.datePublished)
  );

  return (
    <section className="min-h-screen p-5">
      <h2 className="text-4xl text-center">Older Blogs</h2>
      <ul className="flex flex-col items-center justify-center mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4">
        {sortedBlogs.map((blog) => (
          <Link
            // href={`/${blog._id}`}
            href={{
              pathname: `/${blog._id}`,
              query: { id: blog._id },
            }}
            key={blog._id}
            className="p-10 mt-5 overflow-hidden bg-blue-200 rounded-lg cursor-pointer overflow-ellipsis"
          >
            <h3 className="pb-5 text-4xl">{blog.title}</h3>
            <p className="text-justify ">{blog.shortDescription}</p>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Explore;

///////////////////////////////////////////////////////////

// "use client";
// import React, { useState } from "react";
// import { BlogState } from "../Context/BlogContext";

// const Explore = () => {
//   const { state } = BlogState();
//   const [selectedBlog, setSelectedBlog] = useState(null);

//   const openModal = (blog) => {
//     setSelectedBlog(blog);
//   };

//   const closeModal = () => {
//     setSelectedBlog(null);
//   };

//   return (
//     <section className="min-h-screen p-5">
//       <h2 className="text-center">Blog List</h2>
//       <ul className="flex flex-col items-center justify-center mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4">
//         {state.map((blog) => (
//           <li
//             key={blog._id}
//             className="p-10 mt-5 overflow-hidden bg-blue-200 rounded-lg cursor-pointer max-h-60 overflow-ellipsis"
//             onClick={() => openModal(blog)}
//           >
//             <h3 className="pb-5 text-4xl">{blog.title}</h3>
//             <p className="text-justify">{blog.content}</p>
//           </li>
//         ))}
//       </ul>

//       {selectedBlog && (
//         <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
//           <div className="p-8 bg-white rounded-lg">
//             <h2 className="mb-4 text-2xl font-bold">{selectedBlog.title}</h2>
//             <p className="text-justify">{selectedBlog.content}</p>
//             <button
//               className="p-2 mt-4 text-white bg-blue-500 rounded"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Explore;
