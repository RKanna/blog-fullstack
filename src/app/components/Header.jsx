"use client";
import Link from "next/link";
import { useAuthContext } from "../Context/AuthContext";
import { useEffect } from "react";
import { ImPen } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
const Header = () => {
  const { userEmail, handleLogout, setUserId, userId } = useAuthContext();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <section className="w-full h-6rem flex justify-between items-center bg-black pl-3 pr-3 lg:pl-[10rem] lg:pr-[10rem] border-b-[1px]">
      <Link href="/">
        <div className="h-0.5rem">
          <img src="/images/logo.png" alt="" className="h-[5rem]" />
        </div>
      </Link>
      <div className="flex items-center">
        <div className="flex gap-3 lg:gap-10">
          <Link
            className="p-2 text-black bg-white rounded-3xl"
            href="/Explore"
            as="/Explore"
          >
            Explore
          </Link>
          {userId ? (
            <Link
              className="p-2 text-white bg-black rounded-3xl"
              href="/Createblog"
              as="/Createblog"
            >
              <div className="flex items-center gap-2">
                <ImPen />
                Write
              </div>
            </Link>
          ) : (
            ""
          )}

          {userId ? (
            <Link
              className="p-2 text-white bg-black rounded-3xl"
              href="/Profile"
              as="/Profile"
            >
              <div className="flex items-center gap-2">
                <CgProfile />
                Profile
              </div>
            </Link>
          ) : (
            ""
          )}
          {userId ? (
            <Link
              className="p-2 text-white bg-red-500 rounded-3xl"
              href="/"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <Link
              className="p-2 text-white bg-green-500 rounded-3xl"
              href="Login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
