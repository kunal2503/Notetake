import { Trash2, Pencil } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 cursor-pointer relative">
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
        {note.title}
      </h3>

      {/* Content Preview */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {note.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        {/* Actions (hidden until hover) */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Pencil size={16} className="text-gray-600" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note._id);
            }}
            className="p-1 rounded hover:bg-red-50"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;