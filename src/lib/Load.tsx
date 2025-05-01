import Loading from "@/components/Loading";
import React, { useEffect, useState } from "react";

export default function Load() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, []);

  return loading ? <Loading /> : null;
}
