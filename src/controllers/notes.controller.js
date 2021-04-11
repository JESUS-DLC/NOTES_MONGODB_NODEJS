const notesController = {}
const Note = require('../models/note.js')


// crear notas
notesController.renderNotesForm = function(req, res){
    res.render('notes/new-note')
}

notesController.createNewNote =async function(req, res){
    const{title, description} = req.body;
    const newNote = new Note ({title,description});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg','Tarea añadida correctamente');
    res.redirect('/notes')
}

// ver notas
notesController.renderNotes = async function(req, res){
    const notes = await Note.find({user: req.user.id}).sort({createdAt:'asc'}).lean();
    const {name} = req.user;
    res.render('notes/all-notes',{notes,name})
}

// editar notas
notesController.renderEditNotes = async function(req,res){
   const note = await Note.findById(req.params.id).lean();
   if(note.user != req.user.id){
       return res.redirect('/notes');
   }
   res.render('notes/edit-note',{note})
}

notesController.updateEditNotes = async function(req,res){
    const{title,description} = req.body
    await Note.findByIdAndUpdate(req.params.id,{title,description})
    req.flash('update_msg','Tarea actualizada correctamente');
    res.redirect('/notes')
}

// eliminar notas
notesController.deleteNotes = async function(req,res){
    await Note.findByIdAndDelete(req.params.id)
    if(note.user != req.user.id){
        return res.redirect('/notes');
    }
    req.flash('delete_msg','Tarea eliminada correctamente');
    res.redirect('/notes')
}
module.exports = notesController;