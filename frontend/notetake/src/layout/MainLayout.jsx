import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Notes from "../pages/Notes";
import NotFound from "../pages/NotFound";
import NoteView from "../components/NoteView";
import NoteEdit from "../components/NoteEdit";
import NoteDeleteToast from "../components/NoteDeleteToast";

const MainLayout = () => {
    

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="fixed top-0 w-full z-50 bg-gray-200">
                <Navbar />
            </div>

            <div className="flex-1 mt-20 overflow-y-auto">
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
    );
};

export default MainLayout;