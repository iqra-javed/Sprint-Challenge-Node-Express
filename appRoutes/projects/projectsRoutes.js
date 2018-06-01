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

// POST REQUEST
router.post('/', (req, res) => {
    const {name, description, completed} = req.body;
    if(!name || name.length > 128) {
        res.status(400).json({error: 'Please provide a name for the project'})
        return;
    }
    if(!description || description.length > 128) {
        res.status(400).json({error: 'Please provide a description for the project'})
        return;
    }

    projectModel.insert({name, description, completed})
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json({error: 'There was an error saving the new project.'})
        })
})

module.exports = router;