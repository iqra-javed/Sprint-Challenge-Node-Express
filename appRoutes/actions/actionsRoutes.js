const express = require('express');
const actionModel = require('../../data/helpers/actionModel');
const router = express.Router();

// GET REQUEST
router.get('/', (req, res) => {
    actionModel.get()
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.status(500).json({error: 'There was an error while retrieving actions from the database.'})
        })
})


module.exports = router;