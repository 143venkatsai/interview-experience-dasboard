import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate()


  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try{
      const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
      localStorage.setItem("token", response.data.token);
      console.log(response);
      alert("Login Success")
      setLoading(false)
      
      if (response.data.role === "admin") navigate("/admin");
      else navigate("/user")
      

    }catch(err){
      console.log(err.message)
      setError(err.response?.data?.message || "")
    }
  }

  const handleRegister = () =>{
    navigate("/register")
  }

  return (
    <div className='flex justify-center items-center h-screen bg-blue-200'>
      <form onSubmit={handleSubmit} className='border-1 border-gray-400 p-5 shadow-lg rounded-xl lg:w-1/3 w-full m-5 bg-white'>
        <h1 className='text-center font-bold text-blue-700 text-2xl'>Login</h1>
        {/* email */}
        <div className='flex flex-col mb-2'>
          <label htmlFor='email' className='text-gray-500 font-semibold text-md mb-1'>EMAIL</label>
          <input id="email" className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200' type="text" value={email} placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
        </div>

        {/* password */}
        <div className="flex flex-col mb-2 relative">
          <label htmlFor="password" className="text-gray-500 font-semibold text-md mb-1">PASSWORD</label>
          <input
            id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-300 pr-10" type={showPassword ? "password" : "text"} value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required />

      {/* Toggle Icon */}
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>
        </div>
        
        <button type='submit' className='w-full my-3 p-2 text-lg text-white font-semibold bg-blue-500 rounded-lg shadow-xl cursor-pointer'>
          {loading? (<BeatLoader color="#ffffff" size={10} data-testid="loader" />) : "Login"}
        </button>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex items-center'>
          <span>Already have an Account?</span>
          <span className='text-blue-500 ml-2 cursor-pointer' onClick={handleRegister}>Register Here</span>
        </div>
      </form>
    </div>
  )
}

export default Register