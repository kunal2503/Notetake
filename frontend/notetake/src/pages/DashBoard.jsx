import { PlusCircle, BookOpen, Edit3, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    edited: 0,
    deleted: 0,
  });
  const navigate = useNavigate();

  const toggleForm = () => setIsOpen(!isOpen);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/notes");
      const allNotes = response.data.notes;
      setNotes(allNotes);

      // Calculate stats
      const totalNotes = allNotes.length;
      const editedNotes = allNotes.filter(
        (note) => note.updatedAt && new Date(note.updatedAt) > new Date(note.createdAt)
      ).length;

      setStats({
        total: totalNotes,
        edited: editedNotes,
        deleted: 0, // Deleted notes are not stored, so we can't track them
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notes");
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const recentNotes = notes.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8 py-6 md:py-10 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 md:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1">
              Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Welcome back! Here's your note overview
            </p>
          </div>

          <button
            onClick={toggleForm}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl shadow hover:shadow-lg transition duration-200 active:bg-blue-800 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <PlusCircle size={20} />
            Create Note
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 md:mb-12">
          
          {/* Total Notes Card */}
          <div className="bg-white rounded-lg sm:rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition duration-300 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Notes</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-blue-100 rounded-lg">
                <BookOpen size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Edited Notes Card */}
          <div className="bg-white rounded-lg sm:rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition duration-300 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Notes Edited</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                  {stats.edited}
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-green-100 rounded-lg">
                <Edit3 size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          {/* Deleted Notes Card */}
          <div className="bg-white rounded-lg sm:rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition duration-300 border-l-4 border-red-500 sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Notes Deleted</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                  {stats.deleted}
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-red-100 rounded-lg">
                <Trash2 size={24} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Notes Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Recent Notes
            </h2>
            {notes.length > 6 && (
              <button
                onClick={() => navigate("/notes")}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition"
              >
                View All →
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-sm sm:text-base text-gray-600">Loading notes...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-4 sm:p-6 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
              <p className="text-sm sm:text-base text-red-700 mb-3">{error}</p>
              <button
                onClick={fetchNotes}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && notes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 bg-white rounded-lg sm:rounded-xl border-2 border-dashed border-gray-300">
              <PlusCircle size={40} className="text-gray-400 mb-3" />
              <p className="text-gray-600 text-center text-sm sm:text-base mb-4">
                No notes yet. Click "Create Note" to add one ✨
              </p>
              <button
                onClick={toggleForm}
                className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Create Note
              </button>
            </div>
          )}

          {/* Recent Notes Grid */}
          {!loading && !error && recentNotes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {recentNotes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && <NoteForm onClick={toggleForm} />}
    </div>
  );
};

export default Dashboard;