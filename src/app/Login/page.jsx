"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs-react";

const Login = () => {
  const { setEmail, setPassword, handleSignIn, setUserId } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      redirect("/");
    }
  }, []);

  return (
    <section
      className="flex items-center justify-center min-h-screen"
      style={{ minHeight: "calc(100vh - 11rem)" }}
    >
      <form className="max-w-sm mx-auto" onSubmit={handleSignIn}>
        <h1 className="mb-6 text-2xl text-center text-white">Sign In</h1>
        <div className="mb-5 ">
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-white lg:font-medium dark:text-white lg:text-xl"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mb-5 sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white dark:text-white lg:text-xl"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="sm:w-full md:w-full lg:w-[20rem] lg:h-[3.5rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <div className="flex flex-col gap-5 text-center lg:justify-between lg:flex-row">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:text-xl"
          >
            Submit
          </button>
          <Link className="pt-2 text-white lg:text-xl" href="Signup">
            Create a Account
          </Link>
        </div>

        <main className="flex justify-center mt-6">
          <div className="flex flex-col items-center justify-center w-3/4 mt-2 bg-white rounded-xl">
            <h2>Test Credentials</h2>
            <p>Email : naveen@gmail.com</p>
            <p>password : 123456</p>
          </div>
        </main>
      </form>
    </section>
  );
};

export default Login;
