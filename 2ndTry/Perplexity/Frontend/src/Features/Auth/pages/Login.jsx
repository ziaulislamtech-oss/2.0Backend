import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const {handleLogin} = useAuth()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  
  const navigate = useNavigate()
  

  const handleSubmit= async (event)=>{

    event.preventDefault()
    console.log('login...')

    await handleLogin(email,password)

    setEmail("")
    setPassword("")
  
    navigate('/')
  }


  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Perplexity
          </h1>

          <p className="mt-2 text-text-secondary">
            Welcome back! Sign in to continue.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-sm">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
              >
                Email
              </label>

              <input
                id="email"
                value={email}
                required
                onChange={(event)=>{setEmail(event.target.value)}}
                type="email"
                placeholder="Enter your email"
                className=" w-full px-4 py-3 rounded-xl  bg-background border  border-border  text-text  placeholder:text-text-muted outline-none transition  focus:border-primary focus:ring-2  focus:ring-primary/20
                "
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                >
                  Password
                </label>

                
              </div>

              <input
                id="password"
                required
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
                type="password"
                placeholder="Enter your password"
                className=" w-full px-4 py-3 rounded-xl  bg-background border  border-border  text-text  placeholder:text-text-muted outline-none transition  focus:border-primary focus:ring-2  focus:ring-primary/20
                "
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className=" w-full py-3 px-4 rounded-xl  bg-primary  text-white font-medium transition hover:bg-primary-hover active:scale-[0.98]
              "
            >
              Sign in
            </button>

          </form>

          {/* Register */}
          <div className="mt-6 text-center text-sm text-text-secondary">
            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                text-primary
                font-medium
                hover:text-primary-hover
                transition
              "
            >
              Create an account
            </Link>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-text-muted mt-6">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>

      </div>
    </div>
  );
};

export default Login;