import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Register = () => {

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState("")
    const {handleRegister} = useAuth()

    const submitForm = async (event)=>{

        event.preventDefault()

        
        const payload = {
            username,
            email,
            password
            
        }
        await handleRegister(username,email,password)


        console.log('Register Payload',payload)

        setUsername("")
        setEmail("")
        setPassword("")
    }



  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Perplexity
          </h1>

          <p className="mt-2 text-text-secondary">
            Create your account and start exploring.
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-sm">

          <form 
          onSubmit={submitForm}
          className="space-y-5">

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2"
              >
                Username
              </label>

              <input
                id="username"
                required
                value={username}
                onChange={(event)=>{setUsername(event.target.value)}}
                type="text"
                placeholder="Enter your username"
                className=" w-full px-4 py-3 rounded-xl  bg-background border  border-border  text-text  placeholder:text-text-muted outline-none transition  focus:border-primary focus:ring-2  focus:ring-primary/20
                "
              />
            </div>

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
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-background
                  border
                  border-border
                  text-text
                  placeholder:text-text-muted
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>

              <input
                id="password"
                required
                value={password}
                onChange={(event)=>{setPassword(event.target.value)}}
                type="password"
                placeholder="Create a password"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-background
                  border
                  border-border
                  text-text
                  placeholder:text-text-muted
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                "
              />
            </div>

           
            

            {/* Register Button */}
            <button
              type="submit"
           
              className="
                w-full
                py-3
                px-4
                rounded-xl
                bg-primary
                text-white
                font-medium
                transition
                hover:bg-primary-hover
                active:scale-[0.98]
              "
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{" "}

            <Link
              to="/login"
              className="
                text-primary
                font-medium
                hover:text-primary-hover
                transition
              "
            >
              Sign in
            </Link>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-text-muted mt-6">
          By creating an account, you agree to our Terms and Privacy Policy.
        </p>

      </div>
    </div>
  );
};

export default Register;
