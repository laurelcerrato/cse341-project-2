const express = require('express');
const router = express.Router();

const artistsController = require('../controllers/artists.js');
router.get('/', artistsController.getAll);
router.get('/:id', artistsController.getSingle);
const { isAuthenticated } = require("../middleware/authenticate.js")
//create, post, delete endpoints
router.post('/', isAuthenticated, artistsController.createArtist);
router.put('/:id', isAuthenticated, artistsController.updateArtist);
router.delete('/:id', isAuthenticated, artistsController.deleteArtist);

module.exports = router;