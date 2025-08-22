import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate()


  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try{
      await axios.post("http://localhost:5000/api/auth/register", {username, email, password, role});
      alert("Registration Successful");
      navigate("/login");
    }catch(err){
      console.log(err.message)
      setError(err.response?.data?.message || "")
    }
  }

  const handleLogin = () =>{
    navigate("/login")
  }

  return (
    <div className='flex justify-center items-center h-screen bg-blue-200'>
      <form onSubmit={handleSubmit} className='border-1 border-gray-400 p-5 shadow-lg rounded-xl lg:w-1/3 w-full m-5 bg-white'>
        <h1 className='text-center font-bold text-blue-700 text-2xl'>Register</h1>
        {/* username */}
        <div className='flex flex-col mb-2'>
          <label htmlFor="username" className='text-gray-500 font-semibold text-md mb-1'>USERNAME</label>
          <input id="username" className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200' type="text" value={username} placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} required />
        </div>
        {/* email */}
        <div className='flex flex-col mb-2'>
          <label htmlFor='email' className='text-gray-500 font-semibold text-md mb-1'>EMAIL</label>
          <input id="email" className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200' type="text" value={email} placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
        </div>
        {/* password */}
        <div className="flex flex-col mb-2 relative">
          <label htmlFor="password" className="text-gray-500 font-semibold text-md mb-1">PASSWORD</label>
          <input
            id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-300 pr-10" type={showPassword ? "password" : "text"} value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required
          />

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
        {/* role */}
        <div className='flex flex-col mb-3'>
          <label htmlFor='role' className='text-gray-500 font-semibold text-md mb-1'>SELECT ROLE</label>
          <select id="role" className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-300 cursor-pointer' value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type='submit'  className='w-full my-3 p-2 text-lg text-white font-semibold bg-blue-500 rounded-lg shadow-xl cursor-pointer'>
          {loading? (<BeatLoader color="#ffffff" size={10} data-testid="loader" />) : "Register"}
        </button>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex items-center'>
          <span>Already have an Account?</span>
          <span className='text-blue-500 ml-2 cursor-pointer' onClick={handleLogin}>Login Here</span>
        </div>
      </form>
    </div>
  )
}

export default Register