const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const NotesController = require('../controllers/notes');
const authenticated = require('../middleware/authenticated');
const isUserPresent = require('../middleware/isUsePresent');

router.all('*/api/*', authenticated, isUserPresent)
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/api/add-note', NotesController.addNote);
router.post('/api/get-note', NotesController.getAllNote);
router.put('/api/update-note', NotesController.updateNote);
router.post('/api/delete-note', NotesController.deleteNote);

module.exports = router;
