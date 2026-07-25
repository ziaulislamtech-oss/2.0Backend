import { useState } from "react";
import { Mail, Lock, Eye, User, EyeOff, ArrowRight, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import { MusicLoader } from "../components/MusicLoader";

export default function Register() {

  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const { loading, handleRegister } = useAuth()


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    await handleRegister(data)
    reset()
  }

  return (
    <div
      className={`relative min-h-screen  overflow-hidden transition-all duration-500 ${darkMode
        ? "bg-[var(--bg)]"
        : "bg-[var(--primary)]"
        }`}
    >
      {/* Background */}

      <img
        src={
          darkMode
            ? "login-bg-dark.png"
            : "login-bg-white.png"
        }
        alt=""
        className="absolute"
      />

      {/* Overlay */}

      <div
        className={`absolute  inset-0 ${darkMode
          ? "bg-[var(--bg)]/40 backdrop-blur-[1px]"
          : "bg-white/35 backdrop-blur-[1px]"
          }`}
      />

      {/* Decorative Glow */}

      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[var(--primary)] blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-[var(--primary-glow)] blur-[150px]" />

      {/* Main */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 ">
        <div className={`
                w-full
                max-w-md
                overflow-hidden
                rounded-xl
                border
                shadow-[0_30px_80px_rgba(0,0,0,.35)]
                backdrop-blur-2xl
                transition-all
                duration-500
              
    
               ${darkMode
            ? "bg-white/10 border-[var(--border)]"
            : "bg-white/65 border-white"
          }
              `}
        >
          {/* ================================= */}
          {/* Top Image */}
          {/* ================================= */}

          <div className="relative h-44 overflow-hidden">
            <img
              src={
                darkMode
                  ? "login-bg-dark-top.png"
                  : "login-bg-white-top.png"
              }
              alt=""
              className="h-full w-full object-cover"
            />

            <div
              className={`absolute inset-0 ${darkMode
                ? "bg-gradient-to-t from-[var(--bg)]/10 via-transparent"
                : "bg-gradient-to-t from-[var(--primary)] via-transparent"
                }`}
            />

            {/* Theme Switch */}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-xl transition hover:scale-110 ${darkMode
                ? "bg-[var(--primary)] text-[var(--text)]"
                : "bg-white text-gray-700"
                }`}
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* Logo */}

            <div className="absolute bottom-8 left-8">
              <h1
                className={`font-space-grotesk text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"
                  }`}
              >
                Moodify
              </h1>

              <p
                className={`mt-2 font-manrope text-sm  ${darkMode ? "text-white" : "text-white"
                  }`}
              >
                AI Emotion Based Nasheeds
              </p>
            </div>
          </div>

          {/* ============================= */}

          <div className="px-8 pt-6 pb-3">


            {/* INPUTS START HERE */}


            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Name */}
              <div className="flex flex-col mb-5 ">


                <label
                  className={`mb-2 font-space-grotesk text-sm font-medium tracking-[2px] ${darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                    }`}
                >
                  Full Name
                </label>

                <div
                  className={`group mt-2 flex h-14 items-center rounded-xl border transition-all duration-300
  focus-within:border-[var(--primary)]
  focus-within:ring-2
  focus-within:ring-[var(--primary)]/20
  ${darkMode
                      ? "border-[var(--border)] bg-[var(--surface-light)]"
                      : "border-gray-200 bg-white"
                    }`}
                >
                  <User
                    size={20}
                    className={`ml-5 transition ${darkMode
                        ? "text-gray-400 group-focus-within:text-[var(--primary)]"
                        : "text-gray-500 group-focus-within:text-[var(--primary)]"
                      }`}
                  />

                  <input
                    type="username"
                    {...register('username', {
                      required: "Username is required",
                    })}

                    placeholder="Enter your name"
                    className={`h-full flex-1 bg-transparent px-4 font-manrope outline-none placeholder:text-[var(--text-muted)] ${darkMode
                      ? "text-[var(--text)]"
                      : "text-gray-900"
                      }`}
                  />
                </div>

                {errors.username && (
                  <p className="text-red-400 text-sm mt-2 ">
                    {errors.username.message}
                  </p>
                )}

              </div>

              {/* Email */}
              <div className="flex flex-col ">


                <label
                  className={`mb-2 font-space-grotesk text-sm font-medium tracking-[2px] ${darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                    }`}
                >
                  Email Address
                </label>

                <div
                  className={`group mt-2 flex h-14 items-center rounded-xl border transition-all duration-300
  focus-within:border-[var(--primary)]
  focus-within:ring-2
  focus-within:ring-[var(--primary)]/20
  ${darkMode
                      ? "border-[var(--border)] bg-[var(--surface-light)]"
                      : "border-gray-200 bg-white"
                    }`}
                >
                  <Mail
                    size={20}
                    className={`ml-5 transition ${darkMode
                      ? "text-gray-400 group-focus-within:text-[var(--primary)]"
                      : "text-gray-500 group-focus-within:text-violet-600"
                      }`}
                  />

                  <input
                    type="email"
                    {...register('email', {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      }
                    })}

                    placeholder="Enter your email"
                    className={`h-full flex-1 bg-transparent px-4 font-manrope outline-none placeholder:text-[var(--text-muted)] ${darkMode
                      ? "text-[var(--text)]"
                      : "text-gray-900"
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 ">
                    {errors.email.message}
                  </p>
                )}

              </div>

              {/* Password */}

              <div className="mt-6 flex flex-col">
                <label
                  className={`mb-2 font-space-grotesk text-sm font-medium tracking-[2px] ${darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                    }`}
                >
                  Password
                </label>

                <div
                  className={`group mt-2 flex h-14 items-center rounded-xl border transition-all duration-300
  focus-within:border-[var(--primary)]
  focus-within:ring-2
  focus-within:ring-[var(--primary)]/20
  ${darkMode
                      ? "border-[var(--border)] bg-[var(--surface-light)]"
                      : "border-gray-200 bg-white"
                    }`}
                >
                  <Lock
                    size={20}
                    className={`ml-5 transition ${darkMode
                      ? "text-gray-400 group-focus-within:text-[var(--primary)]"
                      : "text-gray-500 group-focus-within:text-violet-600"
                      }`}
                  />

                  <input

                    {...register("password", {
                      required: "Password is required",

                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`h-full flex-1 bg-transparent px-4 font-manrope outline-none placeholder:text-[var(--text-muted)] ${darkMode
                      ? "text-[var(--text)]"
                      : "text-gray-900"
                      }`}
                  />


                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`mr-5 transition hover:scale-110 ${darkMode ? "text-[var(--text-muted)]" : "text-gray-500"
                      }`}
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-2  ">
                    {errors.password.message}
                  </p>
                )}
              </div>




              {/* Login Button */}

              <button
                className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[var(--primary)] font-space-grotesk font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-[var(--primary-hover)] hover:scale-[1.02] active:scale-[0.98]"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <MusicLoader />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  "Register"
                )}


              </button>



              {/* Register */}

              <div className="mt-2 text-center">

                <span
                  className={`font-manrope ${darkMode
                    ? "text-[var(--text-muted)]"
                    : "text-gray-600"
                    }`}
                >
                  Already  have an account?
                </span>

                <button onClick={() => navigate('/login')} className="ml-2 font-space-grotesk font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]">
                  Login
                </button>

              </div>

              {/* Footer */}

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}