import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, Calendar, Clock } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { useState, useEffect } from "react";

const NoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(`/notes/${id}`);
        setNote(response.data.note);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load note");
        console.error("Error fetching note:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
        navigate(`/note/${id}/delete`)
      setIsDeleting(true);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete note");
      console.error("Error deleting note:", err);
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/note/${id}/edit`, { state: { note } });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading note...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate("/notes")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Note not found</p>
          <button
            onClick={() => navigate("/notes")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/notes")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Notes</span>
          </button>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Pencil size={18} />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={18} />
              <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>
          </div>
        </div>

        {/* Note Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Title */}
          <div className="border-b border-gray-200 p-6">
            <h1 className="text-3xl font-bold text-gray-800 break-words">
              {note.title}
            </h1>
          </div>

          {/* Metadata */}
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} className="text-blue-500" />
              <span className="text-sm">
                Created: <span className="font-medium">{formatDate(note.createdAt)}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} className="text-blue-500" />
              <span className="text-sm">
                {formatTime(note.createdAt)}
              </span>
            </div>
            {note.updatedAt && note.updatedAt !== note.createdAt && (
              <div className="flex items-center gap-2 text-gray-600">
                <Pencil size={18} className="text-green-500" />
                <span className="text-sm">
                  Updated: <span className="font-medium">{formatDate(note.updatedAt)}</span>
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap break-words">
              {note.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteView;