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

    getAllNote: async(req, res) => {
        try {
            let search = {}
            if(req.body.search) {
                search = {
                    $or: [
                        {
                            title: new RegExp(req.body.search, 'i')
                        },
                        {
                            color: new RegExp(req.body.search, 'i')
                        }
                    ]
                }
            }
            if(req.body.section) {
                search.isActive = req.body.section.isActive
                search.isArchived = req.body.section.isArchived
                search.isPinned = req.body.section.isPinned
            }
            let obj = {userId: req.user._id, ...search};
            let userNote = await Note.find(obj);
            let totalCount = await Note.find({userId: req.user._id}).count();
            if(!userNote) {
                throw {message: 'Note does not exist'};
            }
            return res.json({
                status: 200,
                message: 'Note/Notes found successfully',
                sectionNotes: userNote.length,
                totalNotes: totalCount,
                data: userNote
            });
        } catch (error) {
            return res.status(401).json({
                message: (error && error.message) || 'Oops!! Failed to find note...'
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