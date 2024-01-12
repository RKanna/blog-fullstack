"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs-react";
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
  } = useAuthContext();

  const checkPasswordField = () => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://13.60.12.79:3001/Users",
        // "http://localhost:3001/Users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            email,
            password,
          }),
        }
      );
      const result = await response.json();

      console.log(result);
      if (result.message === "Signup success") {
        router.push("/Login");
        toast("Register Success");
      } else if (result === "Email already exists") {
        window.alert("Email Already in use");
      }
    } catch (error) {
      console.log(error);
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
      className="flex items-center justify-center min-h-screen"
      style={{ minHeight: "calc(100vh - 11rem)" }}
    >
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h1 className="mb-6 text-2xl text-center">Sign Up</h1>
        <div className="mb-5 ">
          <label
            htmlFor="username"
            className="block mb-2 text-sm text-gray-900 lg:font-medium dark:text-gray-900 lg:text-xl"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
            onChange={(e) => setUserName(e.target.value)}
            name="userName"
          />
        </div>
        <div className="mb-5 ">
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-gray-900 lg:font-medium dark:text-gray-900 lg:text-xl"
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
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 lg:text-xl"
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
        <div className="mb-5">
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 lg:text-xl"
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

        <div className="flex flex-col gap-5 text-center lg:justify-between lg:flex-row">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:text-xl"
          >
            Submit
          </button>
          <Link className="pt-2 lg:text-xl" href="Login">
            Back to Login
          </Link>
        </div>

        <main></main>
      </form>
    </section>
  );
};

export default Signup;
