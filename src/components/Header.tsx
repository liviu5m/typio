"use client";

import { useAppContext } from "@/lib/AppContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (user) setLoading(false);
    else setLoading(false);
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <header className="flex items-center py-5 justify-between">
      <Link href={"/"} className="text-3xl font-bold">Typio</Link>
      <ul className="flex items-center justify-center gap-10">
        <Link
          href={"/"}
          className={`hover:text-[#00ADB5] ${
            pathname == "/" ? "text-[#00ADB5]" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href={"/leaderboard"}
          className={`hover:text-[#00ADB5] ${
            pathname == "/leaderboard" ? "text-[#00ADB5]" : ""
          }`}
        >
          Leaderboard
        </Link>
        <Link
          href={"/about"}
          className={`hover:text-[#00ADB5] ${
            pathname == "/about" ? "text-[#00ADB5]" : ""
          }`}
        >
          About us
        </Link>
        <Link
          href={"/contact"}
          className={`hover:text-[#00ADB5] ${
            pathname == "/contact" ? "text-[#00ADB5]" : ""
          }`}
        >
          Contact Us
        </Link>
      </ul>
      {!user ? (
        <div className="flex items-center justify-center gap-10">
          <Link
            href={"/login"}
            className="px-10 py-3 rounded-lg bg-[#00ADB5] border-2 border-[#00ADB5] hover:bg-white hover:text-[#00ADB5]"
          >
            Log In
          </Link>
          <Link
            href={"/signup"}
            className="px-10 py-3 rounded-lg bg-[#00ADB5] border-2 border-[#00ADB5] hover:bg-white hover:text-[#00ADB5]"
          >
            Sign Up
          </Link>
        </div>
      ) : user ? (
        <Link
          href={"/account"}
          className="px-10 py-3 rounded-lg bg-[#00ADB5] border-2 border-[#00ADB5] hover:bg-white hover:text-[#00ADB5]"
        >
          {user.username}
        </Link>
      ) : (
        <Loading />
      )}
    </header>
  );
}
