import { PlusCircle } from "lucide-react";
import { useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const toggleForm = () => setIsOpen(!isOpen);

  const addNote = (note) => {
    const newNote = {
      ...note,
      _id: Date.now(),
      createdAt: new Date(),
    };

    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6 mt-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Your Notes
        </h1>

        <button
          onClick={toggleForm}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <PlusCircle size={18} />
          Create Note
        </button>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No notes yet. Click "Create Note" to add one ✨
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={deleteNote}
              onEdit={() => {}}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <NoteForm
          onClick={toggleForm}
          onSave={addNote}
        />
      )}
    </div>
  );
};

export default Dashboard;