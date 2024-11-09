// src/pages/Account.tsx

import React, { useEffect, useState } from "react";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { UserInfo } from "../type/in";
import { DataTrip, MapTrip } from "../type/trip";
import useUserProfile from "../hooks/useUserProfile";
import toast from "react-hot-toast";
import axios from "axios";


interface ContextData {
  trips: DataTrip[];
  mapData: MapTrip[];
  user: UserInfo | null;
}
const Account: React.FC = () => {
  const location = useLocation();
  const action = location.state?.action;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"login" | "register">(action || "login");
  const dataGlobal = useOutletContext<ContextData>();
  const [user, setUser] = useState<UserInfo | null>()
  const dataUser = useUserProfile()
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (dataGlobal?.trips?.length > 0) {
      setUser(dataGlobal.user ?? dataUser.user);
      setLoading(false);
    } else {
      setUser(dataUser.user);
    }
  }, [dataGlobal, user]);

  const handleLogOut = async() => {
    const url = import.meta.env.VITE_SERVER_URL;
    const token = localStorage.getItem("access_token") || "";

    toast.promise(
      axios.get(
        url + "/api/user/logout",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      {
        loading: "Tunggu Sebentar...",
        success: () => {
          localStorage.removeItem("access_token");
          navigate("/");
          return "LogOut berhasil!";
        },
        error: (err) => {
          return err?.response?.data?.pesan || "LogOut gagal!";
        },
      }
    );
  }

    return (
      <main className="content items-center w-full">
        <div className="mt-5 w-full rounded-full bg-primary"></div>

        {user && loading == false ? (
          <div className="z-10 w-full rounded-lg bg-white shadow-lg sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/3 p-6 flex flex-col items-center gap-4">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary bg-gray-100">
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-variant1 mb-2">
                {user.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {user.email}
              </p>
            </div>

            <div className="flex gap-4">
              <button className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Edit Profile
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              onClick={handleLogOut}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="z-10 w-full justify-center rounded-lg bg-white shadow sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/3">
            <div className="pt-2 flex justify-center border-b-2 border-gray-100">
              <button
                onClick={() => setActiveTab("login")}
                className={`px-4 py-2 ${
                  activeTab === "login"
                    ? "border-b-4 border-primary font-semibold"
                    : ""
                }`}
              >
                Masuk
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`px-4 py-2 ${
                  activeTab === "register"
                    ? "border-b-4 border-primary font-semibold"
                    : ""
                }`}
              >
                Daftar
              </button>
            </div>
            <div className="flex w-full flex-col p-5">
              {activeTab === "login" ? (
                <>
                  <h1 className="mb-2 text-lg font-semibold text-variant1">
                    Masuk Akun
                  </h1>
                  <p className="text-sm lg:max-w-xs">
                    Buat kamu yang sudah terdaftar, silahkan masuk ke akun kamu
                  </p>

                  <Login />
                </>
              ) : (
                <>
                  <h1 className="mb-2 text-lg font-semibold text-variant1">
                    Buat Akun Baru
                  </h1>
                  <p className="text-sm lg:max-w-xs">
                    Daftar untuk membuat akun baru dan mulai menggunakan
                    aplikasi
                  </p>
                  <Register />
                </>
              )}
            </div>
          </div>
        )}
      </main>
    );
};

export default Account;
