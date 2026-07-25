import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { useForm } from 'react-hook-form'
import { MusicLoader } from "../components/MusicLoader";

export default function Login() {
  const navigate = useNavigate()


  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const { loading, handleLogin } = useAuth()
  

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {

    console.log(data)

    await handleLogin(data)

    reset()

    navigate('/')

  }



  return (
    <div className={`relative min-h-screen overflow-hidden transition-all duration-500 ${darkMode ? "bg-[var(--bg)]" : "bg-[var(--primary)]"
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

      <div className={`absolute inset-0 ${darkMode
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
            rounded-3xl
            border
            shadow-[0_30px_80px_rgba(0,0,0,.35)]
            backdrop-blur-2xl
            transition-all
            duration-500
          

            ${darkMode
            ? "bg-[var(--surface)]/90 border-[var(--border)]"
            : "bg-white/65 border-white"
          }
          `}
        >
          {/* ================================= */}
          {/* Top Image */}
          {/* ================================= */}

          <div className="relative h-64 overflow-hidden">
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
              className={`
absolute
right-5
top-5
flex
h-11
w-11
items-center
justify-center
rounded-full
border
border-[var(--border)]
bg-[var(--surface)]
text-[var(--text)]
backdrop-blur-xl
transition-all
duration-300

hover:border-[var(--primary)]
hover:bg-[var(--surface-light)]
hover:scale-105
`}
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* Logo */}

            <div className="absolute bottom-8 left-8">
              <h1
                className={`text-5xl font-bold font-space-grotesk ${darkMode ? "text-white" : "text-gray-900"
                  }`}
              >
                Moodify
              </h1>

              <p
                className={`mt-2 text-sm font-manrope ${darkMode ? "text-[var(--text-muted)]" : "text-white"
                  }`}
              >
                AI Emotion Based Nasheeds
              </p>
            </div>
          </div>

          {/* ============================= */}

          <div className="px-8 pt-6 pb-3">


            {/* INPUTS START HERE */}
            {/* Email */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col  ">


                <label
                  className={`  text-xs font-space-grotesk tracking-[2px] uppercase font-medium ${darkMode ? "text-white" : "text-gray-700"
                    }`}
                >
                  Email Address
                </label>

                <div
                  className={` group mt-2 flex h-14 items-center rounded-xl border transition-all duration-300 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20

                    ${darkMode
                      ? "border-[var(--border)] bg-[var(--surface-light)]"
                      : "border-gray-200 bg-white"
                    }
                  `}
                >
                  <Mail
                    size={20}
                    className={` ml-5 text-[var(--text-muted)] transition-colors duration-300 group-focus-within:text-[var(--primary)]
               `}
                  />

                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter your email"
                    className={` h-full flex-1 bg-transparent px-4 font-manrope text-[15px] text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none
  `}
                  />
                </div>
                {errors.email && (
                  <p className="
mt-2
font-manrope
text-sm
text-rose-400
">
                    {errors.email.message}
                  </p>
                )}

              </div>

              {/* Password */}

              <div className="mt-6 flex flex-col">
                <label
                  className={`mb-2 block font-space-grotesk tracking-[2px] text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  Password
                </label>

                <div
                  className={`
    group
    flex
    h-14
    items-center
    rounded-xl
    border
    transition-all
    duration-300
    focus-within:border-[var(--primary)]
    focus-within:ring-2
    focus-within:ring-[var(--primary)]/20

    ${darkMode
                      ? "border-[var(--border)] bg-[var(--surface-light)]"
                      : "border-gray-200 bg-white"
                    }
  `}
                >
                  <Lock
                    size={20}
                    className=" ml-5 text-[var(--text-muted)] transition-colors duration-300 group-focus-within:text-[var(--primary)]"
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
                    className=" h-full flex-1 bg-transparent px-4 font-manrope text-[15px] text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none
  "
                  />


                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className=" mr-5 text-[var(--text-muted)] transition-all duration-300 hover:scale-110 hover:text-[var(--primary)]"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className=" mt-2 font-manrope text-sm text-rose-400 ">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember */}


              {/* Login Button */}

              <button
                type="submit"
                disabled={isSubmitting}
                className=" mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[var(--primary)] font-space-grotesk text-[15px] font-semibold tracking-wider  text-white shadow-lg
               shadow-indigo-950/40 transition-all duration-300

       hover:bg-[var(--primary-hover)]
      hover:shadow-xl
      hover:shadow-indigo-500/30
      hover:-translate-y-0.5

      active:translate-y-0
      active:scale-[0.99]
  
      disabled:cursor-not-allowed
      disabled:opacity-70
  "
              >
                {isSubmitting ? (
                  <>
                    <MusicLoader />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </button>



              {/* Register */}

              <div className="mt-8 text-center font-manrope text-sm">

                <span className="text-[var(--text-muted)]">
                  Don't have an account?
                </span>

                <button
                  onClick={() => navigate("/register")}
                  className="
      ml-2
      font-semibold
      text-[var(--primary)]
      transition-colors
      duration-300
      hover:text-[var(--primary-hover)]
    "
                >
                  Create Account
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