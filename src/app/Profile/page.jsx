"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../Context/AuthContext";
import FileBase64 from "react-file-base64";

const Profile = () => {
  const {
    userName,
    profilePhoto,
    fetchUserData,
    userId,
    email,
    address,
    city,
    state,
    phoneNumber,
    setUserName,
  } = useAuthContext();
  const profileId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  console.log(userName);
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
    if (profileId) {
      router.push("/Profile");
    } else {
      router.push("/");
    }
  }, [userId]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    profilePhoto: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
    setFormData({
      email,
      userName,
      address,
      city,
      state,
      phoneNumber,
      profilePhoto,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        // `http://localhost:3001/api/v1/users/${userId}`,
        `https://blog-api-host-iskq.onrender.com/api/v1/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Profile updated successfully");
        closeModal();
        fetchUserData(userId);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <section className="flex flex-col min-h-screen pt-6 pb-6 tech-blur">
      <div className="flex lg:flex-row flex-col justify-between items-center mx-auto bg-yellow-300 lg:w-[50%] p-10 bg-give rounded-xl">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="overflow-hidden rounded-full h-52 w-52">
            <img
              className="object-cover w-full h-full"
              src={profilePhoto}
              alt=""
            />
          </div>
          <h2 className="p-2 mt-2 text-2xl bg-give rounded-xl">
            Hello {userName}
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center lg:justify-end lg:items-start">
          <h2 className="mt-2 text-2xl">{email}</h2>
          <h2 className="mt-2 text-2xl">
            {typeof address === "string"
              ? address
                  .split(",")
                  .map((ele, index) => <div key={index}>{ele.trim()}</div>)
              : ""}
          </h2>
          <h2 className="mt-2 text-2xl">{city}</h2>
          <h2 className="mt-2 text-2xl">{state}</h2>
          <h2 className="mt-2 text-2xl">{phoneNumber}</h2>
          <div className="">
            <button
              className="p-2 mt-2 text-xl text-black bg-white rounded-3xl"
              type="button"
              onClick={openModal}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* updating user profile modal window */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full">
          <div className="p-4 bg-white rounded-lg">
            <h2 className="mb-4 text-2xl font-bold">Update Profile</h2>
            <div className="flex flex-col gap-6">
              <div className="flex justify-around gap-6">
                <input
                  type="text"
                  id="userName-update"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                  type="text"
                  id="email-update"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="flex justify-around gap-6">
                <input
                  type="text"
                  id="address-update"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                  type="text"
                  id="city-update"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex justify-around gap-6">
                <input
                  type="text"
                  id="state-update"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                  type="text"
                  id="phoneNumber-update"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="flex gap-6">
                <label htmlFor="profilePhoto-update">Profile Photo</label>
                <FileBase64
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  className="text-white sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onDone={({ base64 }) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      profilePhoto: base64,
                    }));
                  }}
                />
              </div>
            </div>

            <button
              className="p-2 mt-2 text-xl text-white bg-blue-500 rounded-3xl"
              type="button"
              onClick={handleUpdateProfile}
            >
              Update
            </button>
            <button
              className="p-2 mt-2 text-xl text-black bg-white rounded-3xl"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* end of user profile modal window */}

      <div className="mx-auto mt-10">
        <Link
          className="p-3 text-2xl rounded-xl bg-give"
          // href={`/Filter?author=${encodeURIComponent(userName)}`}
          href={`UserSpecificBlogs`}
        >
          View My Blogs
        </Link>
      </div>
    </section>
  );
};

export default Profile;
