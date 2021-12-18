const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const NotesController = require('../controllers/notes');
const authenticated = require('../middleware/authenticated');
const isUserPresent = require('../middleware/isUsePresent');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/add-note', authenticated, isUserPresent, NotesController.addNote);
router.post('/get-note', authenticated, isUserPresent, NotesController.getAllNote);
router.put('/update-note', authenticated, isUserPresent, NotesController.updateNote);
router.post('/delete-note', authenticated, isUserPresent, NotesController.deleteNote);

module.exports = router;
