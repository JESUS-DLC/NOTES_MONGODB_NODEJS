const { Router } = require('express')
const router = Router();


const { renderNotesForm, 
    createNewNote, 
    renderNotes,
     renderEditNotes, 
     updateEditNotes,
      deleteNotes } = require('../controllers/notes.controller.js');

      const {isAuthenticated}= require('../helpers/auth.js')

// crear notas
router.get('/notes/add',isAuthenticated ,renderNotesForm);

router.post('/notes/new-note',isAuthenticated, createNewNote);

// ver notas
router.get('/notes',isAuthenticated ,renderNotes);

// editar notas
router.get('/notes/edit/:id',isAuthenticated, renderEditNotes);

router.put('/notes/edit/:id',isAuthenticated, updateEditNotes);

// eliminar notas
router.delete('/notes/delete/:id',isAuthenticated, deleteNotes);


module.exports = router;