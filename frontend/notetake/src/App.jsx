import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import MainLayout from "./layout/MainLayout";

const App = () =>{

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