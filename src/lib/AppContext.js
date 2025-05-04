"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import Load from "./Load";
import { usePathname, useRouter } from "next/navigation";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(-1);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setLoading(true);
      axios
        .get("/api/user", {
          params: {
            userId: localStorage.getItem("userId"),
          },
        })
        .then((res) => {
          if (res.data.email) setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else setUser(null);
  }, []);

  console.log(user, loading);

  useEffect(() => {
    if (!user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    } else if (user && (pathname === "/login" || pathname === "/signup")) {
      router.push("/");
    }
  }, [user, pathname, loading, router]);

  return loading ? (
    <Loading />
  ) : (
    <AppContext.Provider value={{ user, setUser }}>
      <Load />
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
