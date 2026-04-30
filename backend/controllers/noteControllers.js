const Note = require("../model/note");

exports.createNote = async (req,res) =>{
    try{
        const {title,content} = req.body;
        if(!title || !content){
            return res.status(400).json({message : "Title and content required"});
        }
        

        res.status(200).json({messsage : "Note Created"});
    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }
}

exports.getNotes = async (req,res) =>{

}

exports.getNoteById = async (req,res) =>{

}

exports.updateNote = async (req,res) =>{

}

exports.deleteNote = async (req,res) =>{
    
}
