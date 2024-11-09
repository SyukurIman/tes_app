import { generateCaptcha } from "./../../helpers/index";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { IoEyeOffSharp, IoEyeSharp, IoRefresh } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./Register.css";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    captcha: "",
    rememberMe: false,
  });

  const [passHidden, setPassHidden] = useState(true);
  const [captcha, setCaptcha] = useState("");
  const navigate = useNavigate();

  const onInputChange = (e: React.ChangeEvent) => {
    const { name, value, checked, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setForm({
        ...form,
        [name]: checked,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const hideOrUnhidePassword = () => {
    setPassHidden(!passHidden);
  };

  const generateNewCaptcha = () => {
    const captcha = generateCaptcha();
    setForm({ ...form, captcha: "" });
    setCaptcha(captcha);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name) return toast.error("Nama tidak boleh kosong!");
    if (!form.email) return toast.error("Email tidak boleh kosong!");
    if (!form.password) return toast.error("Password tidak boleh kosong!");

    const formData = new FormData();

    // Assuming 'form' contains login fields like 'email' and 'password'
    Object.keys(form).forEach((key) => {
      const formKey = key as keyof typeof form;
      const value = form[formKey];
      formData.append(
        formKey,
        typeof value === "boolean" ? value.toString() : value
      );
    });

    if (form.captcha === captcha) {
      generateNewCaptcha();
      toast.promise(
        axios.post(
          import.meta.env.VITE_SERVER_URL + "/api/auth/register",
          JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          loading: "Tunggu Sebentar...",
          success: ({ data }) => {
            localStorage.setItem("access_token", data.token);
            navigate("/");
            return "Register berhasil!";
          },
          error: (err) => {
            return err?.response?.data?.pesan || "Login gagal!";
          },
        }
      );
    } else {
      console.log("captcha error");
      toast.error("Verifikasi captcha gagal");
    }
  };

  useEffect(() => {
    generateNewCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="my-5 flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex w-full rounded border border-slate-300 p-3">
        <input
          onChange={onInputChange}
          aria-label="name"
          name="name"
          type="text"
          placeholder="Nama Lengkap"
          value={form.name}
          className="w-full text-sm focus:outline-none"
        />
      </div>
      <div className="flex w-full rounded border border-slate-300 p-3">
        <input
          onChange={onInputChange}
          aria-label="email"
          name="email"
          type="email"
          placeholder="Alamat E-mail"
          value={form.email}
          className="w-full text-sm focus:outline-none"
        />
      </div>
      <div className="flex w-full rounded border border-slate-300 p-3">
        <input
          onChange={onInputChange}
          aria-label="password"
          name="password"
          type={passHidden ? "password" : "text"}
          placeholder="Password"
          value={form.password}
          className="w-full text-sm focus:outline-none"
        />

        <button type="button" onClick={hideOrUnhidePassword} className="">
          {passHidden ? (
            <IoEyeOffSharp className="text-slate-300" size={16} />
          ) : (
            <IoEyeSharp className="text-slate-300" size={16} />
          )}
        </button>
      </div>

      <div>
        <p className="text-sm text-variant1">Masukkan Code yang kamu lihat</p>
      </div>

      <div className="flex items-center">
        <div className="me-3 min-w-36 select-none rounded-lg bg-slate-300 px-8 py-3 text-center">
          {captcha}
        </div>
        <div className="flex rounded-xl border border-slate-300 p-3">
          <input
            onChange={onInputChange}
            aria-label="captcha"
            name="captcha"
            type="text"
            placeholder="ketik disini"
            value={form.captcha}
            className="w-full text-sm focus:outline-none"
          />
          <button type="button" onClick={generateNewCaptcha}>
            <IoRefresh size={16} className="text-slate-300" />
          </button>
        </div>
      </div>

      <div>
        <p className="text-xs text-slate-500">
          Masukkan karakter (tanpa spasi) yang ditunjukan pada gambar
        </p>
      </div>

      <button type="submit" className="buttonLogin">
        Daftar
      </button>
    </form>
  );
};

export default Register;
