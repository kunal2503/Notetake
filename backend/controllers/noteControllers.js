const Note = require("../model/note");

exports.createNote = async (req,res) =>{
    try{
        const {title,content} = req.body.noteData;
        
        if(!title || !content){
            return res.status(400).json({message : "Title and content required"});
        }
        const newNote = new Note({
            title : title,
            content : content,
            userId : req.user
        })    
        await newNote.save();
        console.log("Note created:", newNote)

        res.status(200).json({messsage : "Note Created"});
    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }
}

exports.getNotes = async (req,res) =>{
    try{
        const userId = req.user;
        if(!userId) {
            return res.status(401).json({message : "Unauthorized"});
        }
        const noteData = await Note.find({userId:userId});
        if(noteData.length === 0){
            return res.status(404).json({message : "Note not found"});
        }
        res.status(200).json({message : "Data extracted", notes : noteData});
    } catch(error){
        console.error(error);
        res.status(500).json({messge : "Internal server error"});
    }
}

exports.getNoteById = async (req,res) =>{
    try {
        const { id } = req.params;
        const userId = req.user;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Check if the note belongs to the current user
        if (note.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Forbidden: You can only view your own notes" });
        }

        res.status(200).json({ message: "Note retrieved", note: note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateNote = async (req,res) =>{
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Check if the note belongs to the current user
        if (note.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Forbidden: You can only update your own notes" });
        }

        note.title = title;
        note.content = content;
        note.updatedAt = Date.now();

        await note.save();

        res.status(200).json({ message: "Note updated successfully", note: note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteNote = async (req,res) =>{
    try {
        const { id } = req.params;
        const userId = req.user;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Check if the note belongs to the current user
        if (note.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Forbidden: You can only delete your own notes" });
        }

        await Note.findByIdAndDelete(id);

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
