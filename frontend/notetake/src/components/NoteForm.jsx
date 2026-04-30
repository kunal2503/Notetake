import { X } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

const NoteForm = ({ onClick }) => {
    const [noteData,SetNoteData] = useState({
        title : "",
        content : ""
    })

    const handleChanges = (e)=>{
        SetNoteData({...noteData,[e.target.name] : e.target.value})
    }

    const handleCreateNote = async()=>{
        try{
            console.log(noteData)
            const response = await axiosInstance.post("/notes",noteData)
            console.log(response);

        } catch(error){
            console.log(error)
        }
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
        
        {/* Close Button */}    
        <button
          onClick={onClick}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create Note
        </h2>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Title
          </label>
          <input
            onChange={handleChanges}
            type="text"
            name="title"
            value={noteData.title}
            placeholder="Enter title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Content Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Content
          </label>
          <textarea
          name="content"
          onChange={handleChanges}
          value={noteData.content}
            rows="4"
            placeholder="Write your note..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClick}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
          onClick={handleCreateNote}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;