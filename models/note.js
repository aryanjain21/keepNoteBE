const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String
    },
    note: {
        type: String
    },
    isActive: {
        type: Number,
        default: 1
    },
    isArchived: {
        type: Number,
        default: 0
    },
    isPinned: {
        type: Number,
        default: 0
    },
    color: {
        type: String
    },
    CreatedAt: {
        type: Date
    },
    UpdatedAt: {
        type: Date
    }
},{collection: 'note'})

noteSchema.pre('save', function (next) {
    let note = this;
    note.CreatedAt = note.UpdatedAt = new Date();
    next()
})

const Note = mongoose.model(noteSchema.options.collection, noteSchema);

module.exports = Note;