"use client";

import Loading from "@/components/Loading";
import { useAppContext } from "@/lib/AppContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const { setUser, user } = useAppContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) router.push("/");
    else setLoading(false);
  }, [user]);

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("/api/user", {
        username: e.currentTarget.username.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        passwordConfirmation: e.currentTarget.passwordConfirmation.value,
      })
      .then((res) => {
        if (res.data.username) {
          setUser(res.data);
          localStorage.setItem("userId", res.data.id);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data.error);
      });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full flex items-center justify-center">
      <div className="w-screen h-full flex items-center justify-center">
        <div className="w-1/2 h-screen bg-linear-to-r from-[#00ADB5] to-[#0064b5] flex items-center justify-center flex-col">
          <h1 className="text-6xl font-bold mb-10">Welcome Back !</h1>
          <h4 className="text-lg">
            To keep connected with us please login with your personal info
          </h4>
          <Link
            href={"/login"}
            className="mt-8 px-16 py-3 bg-transparent border border-[#eee] rounded-lg outline-none text-white cursor-pointer hover:scale-105"
          >
            Log In
          </Link>
        </div>
        <div className="w-1/2 flex items-center justify-center h-full gap-10 flex-col">
          <h1 className="text-2xl">Sign Up</h1>
          <form
            className="flex flex-col gap-5 items-center justify-center"
            onSubmit={(e) => signUp(e)}
          >
            <input
              type="text"
              name="username"
              className="outline-none px-5 py-3 rounded-lg bg-[#00ADB5] placeholder:text-[#fff]"
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              className="outline-none px-5 py-3 rounded-lg bg-[#00ADB5] placeholder:text-[#fff]"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              className="outline-none px-5 py-3 rounded-lg bg-[#00ADB5] placeholder:text-[#fff]"
              placeholder="Password"
            />
            <input
              type="password"
              name="passwordConfirmation"
              className="outline-none px-5 py-3 rounded-lg bg-[#00ADB5] placeholder:text-[#fff]"
              placeholder="Password Confirmation"
            />
            <button className="px-5 py-3 bg-[#EEEEEE] text-[#00ADB5] w-full rounded-lg outline-none border-none cursor-pointer">
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
