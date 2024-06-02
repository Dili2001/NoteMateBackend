// routes/notes.js
const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/notes')
  .get(protect, getNotes)
  .post(protect, createNote);

router.route('/:id')
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
