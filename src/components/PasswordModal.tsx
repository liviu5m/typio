import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PasswordModal({
  setModal,
}: {
  setModal: (e: boolean) => void;
}) {
  const passwordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put("/api/user", {
        userId: localStorage.getItem("userId"),
        password: e.currentTarget.password.value,
        passwordConfirmation: e.currentTarget.passwordConfirmation.value,
        newPassword: e.currentTarget.newPassword.value,
      })
      .then((res) => {
        console.log(res.data);
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 z-40 bg-black[75]">
        <div className="w-[600px] bg-[#eee] rounded-lg px-10 py-5">
          <div className="flex items-center justify-between text-lg">
            <h1 className="text-[#222831]">Update Password</h1>
            <FontAwesomeIcon
              className="text-red-500 hover:scale-125 cursor-pointer p-1"
              icon={faX}
              onClick={() => setModal(false)}
            />
          </div>
          <div className="my-10">
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => passwordChange(e)}
            >
              <input
                type="password"
                name="password"
                className="outline-none px-5 w-full py-3 rounded-lg bg-[#00ADB5] placeholder:text-[#fff]"
                placeholder="Password"
              />
              <input
                type="password"
                name="passwordConfirmation"
                className="outline-none px-5 w-full py-3 rounded-lg bg-[#00ADB5] placeholder:text-[#fff]"
                placeholder="Confirm Password"
              />
              <input
                type="password"
                name="newPassword"
                className="outline-none px-5 w-full py-3 rounded-lg bg-[#00ADB5] placeholder:text-[#fff]"
                placeholder="New Password"
              />
              <button className="px-5 py-3 bg-[#222831] text-[#00ADB5] w-full rounded-lg outline-none border-none cursor-pointer">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute z-30 bg-black/50 w-screen h-screen top-0 left-0 blur-lg backdrop-blur-[1px]">
        <ToastContainer />
      </div>
    </>
  );
}
