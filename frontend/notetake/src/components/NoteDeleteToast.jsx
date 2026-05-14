import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

const NoteDeleteToast = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteNote = async () => {
        try {
            setIsDeleting(true);
            await axiosInstance.delete(`/notes/${id}`);
            navigate("/notes");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete note");
            setIsDeleting(false);
        }
    };

    const handleCancel = () => {
        navigate(`/note/${id}`);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    Delete Note
                </h2>
                <p className="text-gray-600 mb-4">
                    Are you sure you want to delete this note? This action cannot be undone.
                </p>
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleCancel}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteNote}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteDeleteToast;