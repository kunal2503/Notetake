import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";

const App = () =>{

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;