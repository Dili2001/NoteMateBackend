// controllers/noteController.js
const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  const notes = await Note.findAll({ where: { userId: req.user.id } });
  res.json(notes);
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({ where: { userId: req.user.id } });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.create({ title, content, userId: req.user.id });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await Note.findOne({ where: { id, userId: req.user.id } });
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ where: { id, userId: req.user.id } });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    await note.destroy();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};