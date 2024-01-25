"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs-react";
import FileBase64 from "react-file-base64";
const Signup = () => {
  const router = useRouter();

  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setUserEmail,
    encryptedPassword,
    setEncryptedPassword,
    phoneNumber,
    profilePhoto,
    address,
    city,
    state,
    setAddress,
    setCity,
    setState,
    setPhoneNumber,
    setProfilePhoto,
  } = useAuthContext();

  const checkPasswordField = () => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch("http://localhost:3001/Users", {
      const response = await fetch(
        `https://blog-api-host-iskq.onrender.com/Users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            email,
            password,
            address,
            city,
            state,
            phoneNumber,
            profilePhoto,
          }),
        }
      );

      const result = await response.json();

      console.log("Response from server:", result);

      if (result.message === "Signup success") {
        router.push("/Login");
        toast("Register Success");
      } else if (result.message === "Email already exists") {
        window.alert("Email Already in use");
      } else {
        // Handle other cases if needed
        console.error("Unexpected server response:", result);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
      redirect("/");
    }
  }, []);

  return (
    <section
      className="flex items-center justify-center min-h-screen pt-6 pb-6"
      style={{ minHeight: "calc(100vh - 11rem)" }}
    >
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h1 className="mb-6 text-2xl text-center text-white">Sign Up</h1>
        <div className="flex flex-row justify-around gap-8 mb-5">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="block mb-2 text-sm text-white lg:font-medium dark:text-white lg:text-xl"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your Full Name"
              required
              onChange={(e) => setUserName(e.target.value)}
              name="userName"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-white lg:font-medium dark:text-white lg:text-xl"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </div>
        </div>

        <div className="flex flex-row justify-around gap-8 mb-5">
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="block mb-2 text-sm text-white lg:font-medium dark:text-white lg:text-xl"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address"
              required
              onChange={(e) => setAddress(e.target.value)}
              name="address"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="block mb-2 text-sm text-white lg:font-medium dark:text-white lg:text-xl"
            >
              City
            </label>
            <select
              id="city"
              className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => setCity(e.target.value)}
              name="city"
            >
              <option value="" disabled selected>
                Select a city
              </option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Trichy">Trichy</option>
              <option value="Tirunelveli">Tirunelveli</option>
              <option value="Kanyakumari">Kanyakumari</option>
            </select>
          </div>
        </div>
        {/*  */}

        <div className="flex flex-row justify-around gap-8 mb-5">
          <div className="flex flex-col">
            <label
              htmlFor="state"
              className="block mb-2 text-sm text-white lg:font-medium dark:text-white lg:text-xl"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="State"
              required
              onChange={(e) => setState(e.target.value)}
              name="state"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phNumber"
              className="block mb-2 text-sm text-white lg:font-medium dark:text-white lg:text-xl"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Phone Number"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phoneNumber"
            />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-row justify-around gap-8 mb-5">
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white lg:text-xl"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-white dark:text-white lg:text-xl"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirm-password"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 mt-6 mb-6">
          <label
            htmlFor="profileImage"
            className="block mb-2 text-sm font-medium text-nowrap dark:text-white lg:text-xl"
          >
            Upload Profile Photo
          </label>

          <FileBase64
            type="file"
            name="profileImage"
            id="profileImage"
            // value={}
            className="text-white sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onDone={({ base64 }) => {
              setProfilePhoto(base64);
            }}
          />
        </div>

        <div className="flex flex-col gap-5 text-center lg:justify-between lg:flex-row">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:text-xl"
          >
            Submit
          </button>
          <Link className="pt-2 text-white lg:text-xl" href="Login">
            Back to Login
          </Link>
        </div>

        <main></main>
      </form>
    </section>
  );
};

export default Signup;
