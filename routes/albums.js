const express = require('express');
const router = express.Router();

const albumsController = require('../controllers/albums.js');

const { isAuthenticated } = require("../middleware/authenticate.js")



router.get('/', albumsController.getAll);
router.get('/:id', albumsController.getSingle);

router.post('/', isAuthenticated, albumsController.createAlbum);
router.put('/:id', isAuthenticated, albumsController.updateAlbum);
router.delete('/:id', isAuthenticated, albumsController.deleteAlbum);

module.exports = router;