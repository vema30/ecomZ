import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const[response1,setResponse]= useState("");
const navigate= useNavigate();
  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });
      localStorage.setItem('authToken', response.data.token); // Use sessionStorage if needed
      alert('Login successful!');

      console.log("Login successful:", response.data);
      setResponse("Login successful");
      //window.location.reload();
      navigate("/home");

          

      // Handle success (e.g., redirect or display a success message)
    } catch (error) {
      
      console.error("Error during login:", error.response?.data || error.message);
      setResponse(error.message);
      // Handle error (e.g., display error message)
    }
    
  };

  return (
    <div className="bg-black h-screen w-screen flex flex-col justify-center items-center text-white text-2xl font-bold">
        {response1}
      <div className="flex flex-col justify-center items-center w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
        <label className="mb-4">Login</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="m-2 text-xl p-3 rounded-lg border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
        />

        <label className="mb-4">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="m-2 text-xl p-3 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
        />

        <div className="flex flex-col items-center w-full">
          <button
            onClick={handleClick}
            className="bg-green-800 text-white text-xl p-3 m-3 w-full rounded-lg hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
          <Link to="/register" className="text-xl text-gray-400 underline hover:text-white">
            Register
          </Link>
        </div>
      </div>
     
    </div>
  );
};

export default Login;
