// src/hooks/useUserProfile.ts
import { useEffect, useState } from "react";
import { UserInfo } from "../type/in";

const useUserProfile = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const token = localStorage.getItem("access_token") || "";

        if (token) {
          const response = await fetch(url + "/api/user/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (data?.data?.name) {
            setUser({
              token,
              name: data.data.name,
              email: data.data.email,
              photoUrl: "",
            });
          } else {
            localStorage.removeItem("access_token");
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return { user, setUser };
};

export default useUserProfile;
