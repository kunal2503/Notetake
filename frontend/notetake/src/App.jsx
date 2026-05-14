import { BrowserRouter, Route, Routes} from "react-router-dom";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/*" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
              } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
