// Login.jsx

import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from 'axios'

const Login = () => {

  const {

    register,
    handleSubmit,
    formState: { errors }

  } = useForm()
  

  const onSubmit = async(data) => {
    try{

      const response = await axios.post('http://localhost:3000/api/auth/login',
        data,{
          withCredentials: true
        }
      )

      console.log(response.data)

    }catch(errors){
      console.log(errors)
    }
  }

  return (
    <div className="min-h-screen bg-[#1D1D1D] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#252525] p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-300 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              {...register('username', {
                required: "username is required"
              })}
              className="w-full px-4 py-3 rounded-lg bg-[#1D1D1D] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#BD2423]"
            />{errors.username && (
              <p className="text-red-500 text-sm">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register('password',{
                required : "password is required",
                minLength : {
                  value : 6,
                  message : "password must be atleast 6 characters"
                }
              })}
              className="w-full px-4 py-3 rounded-lg bg-[#1D1D1D] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#BD2423]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#BD2423] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
          <p className="text-center text-gray-400 text-sm mt-4">
            Don't  have an account?{" "}
            <Link to='/register' className="text-[#BD2423] font-bold cursor-pointer hover:underline">
              Register
            </Link>


          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;