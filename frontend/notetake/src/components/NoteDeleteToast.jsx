import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const NoteDeleteToast = ({noteId,onClose}) => {
    const navigate = useNavigate();
    const id = useParams().id;

    const handleDeleteNote = async()=>{
        try{
            const response = await axiosInstance.delete(`/notes/${noteId}`)
            console.log(response);
            onClose();
        }
        catch(error){
            console.log(error)
        }
    }

    const handleCancel = () =>{
        navigate(`/note/${id}`)
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Are you sure you want to delete this note?
            </h2>
            <div className="flex justify-end gap-4">
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >   
                    Cancel
                </button>
                <button
                    onClick={handleDeleteNote}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
  )
}   

export default NoteDeleteToast