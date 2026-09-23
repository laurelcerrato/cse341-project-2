const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const DB_NAME = 'laurel_database';
const COLLECTION = 'artists';

const getCollection = () => mongodb.getDatabase().db(DB_NAME).collection(COLLECTION);

const buildArtist = (body) => ({
    firstName: body.firstName,
    lastName: body.lastName,
    genre: body.genre,
    country: body.country,
    albums: body.albums,
    popularSongs: body.popularSongs,
});

const getAll = async (req, res) => {
    //#swagger.tags=['Artists']
    try {
        const artists = await getCollection().find().toArray();
        res.status(200).json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Artists']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid artist id');
    }
    try {
        const artist = await getCollection().findOne({ _id: new ObjectId(req.params.id) });
        if (!artist) {
            return res.status(404).json('Artist not found');
        }
        res.status(200).json(artist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createArtist = async (req, res) => {
    //#swagger.tags=['Artists']
    const { firstName, genre, country } = req.body;
    if (!firstName || !genre || !country) {
        return res.status(400).json({ message: 'firstName, genre, and country are required.' });
    }
    try {
        const response = await getCollection().insertOne(buildArtist(req.body));
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json('Some error occurred while creating the artist');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateArtist = async (req, res) => {
    //#swagger.tags=['Artists']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid artist id');
    }
    const { firstName, genre, country } = req.body;
    if (!firstName || !genre || !country) {
        return res.status(400).json({ message: 'firstName, genre, and country are required.' });
    }
    try {
        const response = await getCollection().replaceOne(
            { _id: new ObjectId(req.params.id) },
            buildArtist(req.body)
        );
        if (response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Artist not found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteArtist = async (req, res) => {
    //#swagger.tags=['Artists']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid artist id');
    }
    try {
        const response = await getCollection().deleteOne({ _id: new ObjectId(req.params.id) });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Artist not found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createArtist,
    updateArtist,
    deleteArtist
};
// const mongodb = require('../data/database');
// const ObjectId = require('mongodb').ObjectId;
// const getAll = async (req, res) => {
//     const result = await mongodb.getDatabase().db('laurel_database').collection('artists').find();
//     result.toArray().then(contacts => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(contacts);
//     });
// };

// const getSingle = async (req, res) => {
//     //swagger-tags=['Contacts']
//     const artistId = new ObjectId(req.params.id);  // 👈 nota: "id" en minúscula, no "Id"
//     const result = await mongodb.getDatabase().db('laurel_database').collection('artists').find({_id: artistId});
//     result.toArray().then(artists => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(artists[0]);
//     });
// };

// const createArtist = async (req, res) => {
//     //swagger-tags=["Contacts"]
//     const artist= {
//         firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     genre: req.body.genre,
//     country: req.body.country,
//     albums: req.body.albums,
//     popularSongs: req.body.popularSongs,
//     };
//     const response = await mongodb.getDatabase().db().collection('artists').insertOne(artist);
//     if (response.acknowledged) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'Some error ocurred while updating the artist');
//     }
// };
// const updateArtist = async (req, res) => {
//     //#swagger.tags=['Artists']
//     const artistId = new ObjectId(req.params.id);
//     const artist = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         genre: req.body.genre,
//         country: req.body.country,
//         albums: req.body.albums,
//         popularSongs: req.body.popularSongs,
//     };
//     const response = await mongodb.getDatabase().db().collection('artists').replaceOne({ _id: artistId }, artist);
//     if (response.modifiedCount > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'Some error occurred while updating the artist');
//     }
// };

// const deleteArtist = async (req, res) => {
//     //#swagger.tags=['Artists']
//     const artistId = new ObjectId(req.params.id);
//     const response = await mongodb.getDatabase().db().collection('artists').deleteOne({ _id: artistId });
//     if (response.deletedCount > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'Some error occurred while deleting the artist');
//     }
// };

// module.exports = {
//     getAll,
//     getSingle,
//     createArtist,
//     updateArtist,
//     deleteArtist
// };
// const updateartist = async (req, res) => {
//     //swagger-tags=["Contacts"]
//     const contactId = new ObjectId(req.params.id);
//     const contact = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         favoriteColor: req.body.favoriteColor,
//         birthday: req.body.birthday,
//     };
//     const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, contact);
//     if (response.modifiedCount > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'Some error ocurred whuile updating the contact');
//     }
// };
// const deleteContact = async (req, res) => {
//     //swagger-tags=['Contacts']
//     const contactId = new ObjectId(req.params.id);
//     const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
//     if (response.deletedCount > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'Some error ocurred whuile updating the contact');
//     }
// };



// module.exports = {
//     getAll,
//     getSingle,
//     createContact,
//     updateContact,
//     deleteContact
// };