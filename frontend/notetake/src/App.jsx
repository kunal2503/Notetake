import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import MainLayout from "./layout/MainLayout";
import { useState,useEffect } from "react";
import axiosInstance from "./utils/axiosInstance";

const App = ()=>{
   const [user, setUser] = useState(null);

   const fetchUser = async () =>{
      try{
        const response = await axiosInstance.get("/me");
  
        console.log("User info:", response.data);
        setUser(response.data);
      } catch(error){
        console.error("Error fetching user info:", error);  
      }
    }

    useEffect(() => {
      fetchUser();
    }, []);

  return (
    <BrowserRouter>
      <Routes>
          
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<MainLayout />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;