import { useState } from "react";
import NoteCard from "../components/NoteCard";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/notes");
      setNotes(response.data.notes);
      console.log(response.data.notes);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load notes");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="w-full h-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
              My Notes
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </p>
          </div>
          
          <button
            onClick={() => navigate("/notes")}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-500 text-white rounded-lg sm:rounded-xl hover:bg-blue-600 transition duration-200 active:bg-blue-700 w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            <span className="text-sm sm:text-base">New Note</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16">
          <div className="animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">Loading notes...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="max-w-7xl mx-auto">
          <div className="p-4 sm:p-6 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
            <p className="text-sm sm:text-base text-red-700">{error}</p>
            <button
              onClick={getNotes}
              className="mt-3 sm:mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 max-w-7xl mx-auto">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <Plus size={32} className="text-gray-500" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            No notes yet
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">
            Create your first note to get started
          </p>
          <button
            onClick={() => navigate("/notes")}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 text-white rounded-lg sm:rounded-xl hover:bg-blue-600 transition text-sm sm:text-base"
          >
            Create Note
          </button>
        </div>
      )}

      {/* Notes Grid */}
      {!loading && !error && notes.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
