const Note = require('../models/note');

module.exports = {
    addNote: async (req, res) => {
        try {
            if (!req.body.title || !req.body.note) {
                throw { message: 'Note is required' };
            }
            req.body.userId = req.user._id;
            let note = new Note(req.body);
            let newNote = await note.save();
            return res.json({
                status: 200,
                message: 'Note added successfully',
                data: newNote
            });
        } catch (error) {
            return res.status(401).json({
                message: (error && error.message) || 'Oops!! Failed to add note...'
            });
        }
    },

    updateNote: async (req, res) => {
        try {
            if(!req.body.noteId) {
                throw {message: 'Note id is required'};
            }
            let note = await Note.findById({_id: req.body.noteId});
            if (!note) {
                throw { message: 'Note does not exist' };
            }
            let updatedNote = await Note.findByIdAndUpdate(note._id, req.body, {new: true});
            if(!updatedNote) {
                throw {message: 'Failed to update note'};
            }
            return res.json({
                status: 200,
                message: 'Note updated successfully',
                data: updatedNote
            });
        } catch (error) {
            return res.status(401).json({
                message: (error && error.message) || 'Oops!! Failed to update note...'
            });
        }
    },

    deleteNote: async (req, res) => {
        try {
            if (!req.body.noteId) {
                throw { message: 'Note does not exist' };
            }
            let deleteNote = await Note.findByIdAndDelete(req.body.noteId);
            if (!deleteNote) {
                throw { message: 'Note not found' };
            }
            return res.status(200).json({
                status: 200,
                message: 'Note deleted!!!'
            });
        } catch (error) {
            return res.status(401).json({
                message: (error && error.message) || 'Oops!! Failed to delete note...'
            });
        }
    }
}