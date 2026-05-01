import Navbar from "../components/Navbar";
import Dashboard from "../pages/DashBoard";
import {  Route, Routes } from "react-router-dom";
import Notes from "../pages/Notes";
import NotFound from "../pages/NotFound";
import NoteView from "../components/NoteView";
import NoteEdit from "../components/NoteEdit";
import NoteForm from "../components/NoteForm";
import NoteDeleteToast from "../components/NoteDeleteToast";

const MainLayout = () => {
    return (
        <div className="w-full h-screen flex flex-row items-start justify-start">
            <div className="fixed top-0 w-full h-1/10 bg-gray-200">
                <Navbar />
            </div>
            <div className="w-full h-full mt-10">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/note/:id" element={<NoteView />} />
                    <Route path="/note/:id/edit" element={<NoteEdit />} />
                    <Route path="/note/:id/delete" element={<NoteDeleteToast />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    )
}   

export default MainLayout;