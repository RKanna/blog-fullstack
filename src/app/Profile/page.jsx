"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../Context/AuthContext";

const page = () => {
  const { userName } = useAuthContext();
  // const profileId = localStorage.getItem("userId");
  const profileId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  console.log(userName);
  const router = useRouter();

  useEffect(() => {
    if (profileId) {
      router.push("/Profile");
    } else {
      router.push("/");
    }
  }, []);

  return (
    <section className="flex flex-col min-h-screen tech-blur">
      <div className="w-[20%] flex flex-col items-center mx-auto">
        <img src="./images/author.png" alt="" />
        <h2 className="text-2xl">Hello {userName}</h2>
      </div>
      <div className="mx-auto mt-10">
        <Link
          className="p-3 text-2xl rounded-xl bg-give"
          href={`/Filter?author=${encodeURIComponent(userName)}`}
        >
          View My Blogs
        </Link>
      </div>
    </section>
  );
};

export default page;

////////////////////////////////////////////

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useAuthContext } from "../Context/AuthContext";
// import FileBase64 from "react-file-base64";

// const Page = () => {
//   const { userName } = useAuthContext();
//   const profileId = localStorage.getItem("userId");
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (profileId) {
//       router.push("/Profile");
//     } else {
//       router.push("/");
//     }
//   }, []);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       // Set up a callback for when the file is loaded as base64
//       reader.onloadend = () => {
//         // The result contains the base64 data
//         const base64Data = reader.result;
//         setUploadedImage(base64Data);

//         // Perform additional logic or send the base64Data to a server if needed
//         // Example: You can send base64Data to a server using fetch or axios
//         // const formData = new FormData();
//         // formData.append("image", base64Data);
//         // fetch("/api/upload", {
//         //   method: "POST",
//         //   body: formData,
//         // });
//       };

//       // Read the file as a data URL, which returns the base64 representation
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <section className="flex flex-col min-h-screen tech-blur">
//       <div className="w-[20%] flex flex-col items-center mx-auto">
//         <label htmlFor="imageInput">
//           <img
//             src={uploadedImage || "./images/author.png"}
//             alt=""
//             style={{ cursor: "pointer" }}
//           />
//           <input
//             id="imageInput"
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={handleImageChange}
//           />
//         </label>
//         <h2 className="text-2xl">Hello {userName}</h2>
//       </div>
//       <div className="mx-auto mt-10">
//         <Link
//           className="p-3 text-2xl rounded-xl bg-give"
//           href={`/Filter?author=${encodeURIComponent(userName)}`}
//         >
//           View My Blogs
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Page;

/////////////////////////////////////////////////////

// Page.jsx
// Profile.jsx
// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useAuthContext } from "../Context/AuthContext";
// import FileBase64 from "react-file-base64";

// const Profile = () => {
//   const { userName } = useAuthContext();
//   const profileId = localStorage.getItem("userId");
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (!profileId) {
//       router.push("/");
//     }
//   }, [profileId, router]);

//   const handleImageChange = (file) => {
//     if (file) {
//       setUploadedImage(file.base64);
//     }
//   };

//   const uploadImage = async () => {
//     try {
//       // Fetch the user by userName to get the ID
//       // const userResponse = await fetch(`/api/v1/users?userName=${userName}`);
//       const userResponse = await fetch(
//         `https://tame-pink-pike-sock.cyclic.app/api/v1/users?userName=${userName}`
//       );
//       const userData = await userResponse.json();

//       if (userData.success && userData.data) {
//         const userId = userData.data._id;

//         // Use the userId in the image upload request
//         const response = await fetch(`/api/v1/users/${userId}/upload`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ image: uploadedImage }),
//         });

//         const data = await response.json();

//         if (data.success) {
//           console.log("Image uploaded successfully");
//           // You may want to update the user profile data or take other actions
//         } else {
//           console.error("Image upload failed:", data.message);
//         }
//       } else {
//         console.error("Error fetching user data:", userData.message);
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   return (
//     <section className="flex flex-col min-h-screen tech-blur">
//       <div className="w-[20%] flex flex-col items-center mx-auto">
//         <label htmlFor="imageInput">
//           <img
//             src={uploadedImage || "./images/author.png"}
//             alt=""
//             style={{ cursor: "pointer" }}
//           />
//           <FileBase64 multiple={false} onDone={handleImageChange} />
//         </label>
//         <h2 className="text-2xl">Hello {userName}</h2>
//         <button onClick={uploadImage}>Upload Image</button>
//       </div>
//       <div className="mx-auto mt-10">
//         <Link
//           className="p-3 text-2xl rounded-xl bg-give"
//           href={`/Filter?author=${encodeURIComponent(userName)}`}
//         >
//           View My Blogs
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Profile;
