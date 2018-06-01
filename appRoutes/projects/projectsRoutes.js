const express = require('express');
const projectModel = require('../../data/helpers/projectModel');
const router = express.Router();


// GET REQUEST
router.get('/', (req, res) => {
    projectModel.get()
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.status(500).json({error: 'There was an error while retrieving projects from the database.'})
        })
})


// GET REQUEST BY ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectModel.get(id)
        .then(project => {
            res.json(project)
        })
        .catch(error => {
            res.status(500).json({error: `There was an error retrieving project with id ${id}.`})
        })
})


module.exports = router;