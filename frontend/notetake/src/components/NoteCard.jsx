import { Trash2, Pencil, View } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note }) => {
  const navigate = useNavigate();

  const handleView = () => {
    console.log(note);
    navigate(`/note/${note._id}`);
  };

  const handleEdit = () => {
    navigate(`/note/${note._id}/edit`, { state: { note } });
  };

  const handleDelete = async () => {
    try {
        navigate(`/note/${note._id}/delete`)
      
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleNoteDelete = async () =>{
      navigate(`/note/${note._id}/delete`)
  }

  return (
    <div className="group bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-lg transition duration-300 cursor-pointer relative hover:border-gray-300">
      
      {/* Title */}
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 truncate group-hover:text-blue-600 transition">
        {note.title}
      </h3>

      {/* Content Preview */}
      <p className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 leading-relaxed">
        {note.content}
      </p>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-gray-100 pt-3 sm:pt-4">
        <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>

        {/* Actions */}
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          
          <button
            onClick={handleView}
            className="flex-1 sm:flex-none p-2 sm:p-2.5 rounded-lg hover:bg-blue-50 transition duration-200 active:bg-blue-100"
            title="View note"
          >
            <View size={18} className="text-gray-600 hover:text-blue-600 transition mx-auto sm:mx-0" />
          </button>
          
          <button
            onClick={handleEdit}
            className="flex-1 sm:flex-none p-2 sm:p-2.5 rounded-lg hover:bg-green-50 transition duration-200 active:bg-green-100"
            title="Edit note"
          >
            <Pencil size={18} className="text-gray-600 hover:text-green-600 transition mx-auto sm:mx-0" />
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 sm:flex-none p-2 sm:p-2.5 rounded-lg hover:bg-red-50 transition duration-200 active:bg-red-100"
            title="Delete note"
          >
            <Trash2 size={18} className="text-gray-600 hover:text-red-600 transition mx-auto sm:mx-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;