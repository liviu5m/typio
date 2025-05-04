"use client";

import Loading from "@/components/Loading";
import PasswordModal from "@/components/PasswordModal";
import { useAppContext } from "@/lib/AppContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type User = {
  username: string;
  email: string;
};

type Record = {
  wordsNumber: number;
  createdAt: string;
};

export default function Account() {
  const [user, setUser] = useState<User>();
  const [records, setRecords] = useState<Record[]>();
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const { setUser: setUserContext } = useAppContext();

  useEffect(() => {
    axios
      .get("/api/user", {
        params: {
          userId: localStorage.getItem("userId"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/api/record", {
        params: {
          userId: localStorage.getItem("userId"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setRecords(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logOut = () => {
    localStorage.removeItem("userId");
    router.push("/login");
    setUserContext(null);
  };

  return (
    user &&
    records && (
      <div className="flex items-center justify-center">
        <div className="absolute top-5 left-5">
          <Link
            href={"/"}
            className="text-white flex items-center justify-center gap-5"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="text-lg">Back</span>
          </Link>
        </div>
        <div className="container flex items-center justify-center mt-20">
          <div className="w-1/2 flex justify-center flex-col gap-5">
            <h1 className="text-2xl">Account</h1>
            <h2 className="text-xl mt-5">
              Username: <span className="text-[#00ADB5]">{user.username}</span>
            </h2>
            <h2 className="text-xl">
              Email: <span className="text-[#00ADB5]">{user.email}</span>
            </h2>
            <h2 className="text-xl">
              Best WPM:{" "}
              <span className="text-[#00ADB5]">
                {records.length != 0
                  ? Math.max(
                      ...records.map((record: Record) => record.wordsNumber)
                    )
                  : "0"}
              </span>
            </h2>
            <button
              className="outline-none border-none px-5 py-3 rounded-lg bg-[#00ADB5] text-[#eee] w-1/2 cursor-pointer hover:text-[#00ADB5] hover:bg-[#eee]"
              onClick={() => setModal(true)}
            >
              Update Password
            </button>
            <button
              className="utline-none border-none px-5 py-3 rounded-lg bg-[#00ADB5] text-[#eee] w-1/2 cursor-pointer hover:text-[#00ADB5] hover:bg-[#eee]"
              onClick={() => logOut()}
            >
              Log Out
            </button>
          </div>
          <div className="w-1/2 flex items-center justify-center flex-col">
            <h1 className="text-2xl">
              {records.length != 0 ? "Your Last 10 Records" : "No records"}
            </h1>
            {records.length != 0 && (
              <table className="border-collapse border border-[#eee] table-auto w-full mt-10">
                <thead>
                  <tr>
                    <th className="border border-[#eee] text-[#eee] bg-[#00ADB5] p-4 w-1/3">
                      Nr.
                    </th>
                    <th className="border border-[#eee] text-[#eee] bg-[#00ADB5] w-1/3">
                      Words Number
                    </th>
                    <th className="border border-[#eee] text-[#eee] bg-[#00ADB5] w-1/3">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, i) => {
                    return (
                      <tr key={i}>
                        <td className="border border-[#eee] p-4 text-center">
                          {i + 1}
                        </td>
                        <td className="border border-[#eee] p-4 text-center">
                          {record.wordsNumber}
                        </td>
                        <td className="border border-[#eee] p-4 text-center">
                          {format(new Date(record.createdAt), "MM/dd/yyyy")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {modal && <PasswordModal setModal={setModal} />}
      </div>
    )
  );
}
