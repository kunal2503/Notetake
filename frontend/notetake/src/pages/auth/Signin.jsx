import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import axiosInstance from '../../utils/axiosInstance';

const Signin = () => {
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    });

    const handleChanges = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            const response = await axiosInstance.post("/auth/signin",formData);
            console.log(response.data);


        } catch(error){
            console.log(error);
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
        <div className='flex flex-col items-center justify-center border border-gray-200 w-full max-w-md bg-white shadow-lg rounded-2xl py-8 px-6 md:px-8'>
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Sign In</h1>
            
            <form className='flex flex-col items-center justify-center gap-4 w-full'>
                <input 
                    type="email" 
                    placeholder='Email' 
                    className='border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 w-full transition' 
                    name="email"
                    value={formData.email}
                    onChange={handleChanges}
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    className='border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 w-full transition' 
                    name="password"
                    value={formData.password}
                    onChange={handleChanges}
                />
                <button onClick={handleSubmit} className='bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-lg w-full transition transform hover:scale-105 mt-2'>
                    Sign In
                </button>
            </form>
            
            <p className="text-gray-600 text-sm mt-6">
                Create new account? <Link to={"/signup"} className="text-blue-600 font-semibold hover:underline">Sign In</Link>
            </p>
        </div>
    </div>
  )
}

export default Signin