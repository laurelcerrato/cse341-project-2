const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const DB_NAME = 'laurel_database';
const COLLECTION = 'albums';

const getCollection = () => mongodb.getDatabase().db(DB_NAME).collection(COLLECTION);

const buildAlbum = (body) => ({
    title: body.title,
    artistId: body.artistId,
    releaseYear: body.releaseYear,
    genre: body.genre,
    tracks: body.tracks,
});

const getAll = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const albums = await getCollection().find().toArray();
        res.status(200).json(albums);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Albums']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid album id');
    }
    try {
        const album = await getCollection().findOne({ _id: new ObjectId(req.params.id) });
        if (!album) {
            return res.status(404).json('Album not found');
        }
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    const { title, artistId, releaseYear } = req.body;
    if (!title || !artistId || !releaseYear) {
        return res.status(400).json({ message: 'title, artistId, and releaseYear are required.' });
    }
    try {
        const response = await getCollection().insertOne(buildAlbum(req.body));
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json('Some error occurred while creating the album');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid album id');
    }
    const { title, artistId, releaseYear } = req.body;
    if (!title || !artistId || !releaseYear) {
        return res.status(400).json({ message: 'title, artistId, and releaseYear are required.' });
    }
    try {
        const response = await getCollection().replaceOne(
            { _id: new ObjectId(req.params.id) },
            buildAlbum(req.body)
        );
        if (response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Album not found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid album id');
    }
    try {
        const response = await getCollection().deleteOne({ _id: new ObjectId(req.params.id) });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Album not found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createAlbum,
    updateAlbum,
    deleteAlbum
};