import Navbar from "../components/Navbar";
import Dashboard from "../pages/DashBoard";
import {  Route, Routes } from "react-router-dom";
import Notes from "../pages/Notes";
import NotFound from "../pages/NotFound";

const MainLayout = () => {
    return (
        <div className="w-full h-screen flex flex-row items-start justify-start">
            <div className="fixed top-0 w-full h-1/10 bg-gray-200">
                <Navbar />
            </div>
            <div className="w-full h-full mt-10">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Notes" element={<Notes />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    )
}   

export default MainLayout;