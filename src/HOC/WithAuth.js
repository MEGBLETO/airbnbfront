import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const WithAuth = (WrappedComponent) => {
  return () => {
    const router = useRouter();

    const [isLogged, setIslogged] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIslogged(false);
        router.push("/login");
      }
      setIslogged(true);
    }, []);

    if (isLogged) {
      return <WrappedComponent />;
    }
  };
};

export default WithAuth;
