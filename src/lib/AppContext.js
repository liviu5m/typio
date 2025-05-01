"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import Load from "./Load";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

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
