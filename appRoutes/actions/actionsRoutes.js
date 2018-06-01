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

// GET REQUEST BY ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionModel.get(id)
        .then(action => {
            res.json(action)
        })
        .catch(error => {
            res.status(500).json({error: `There was an error retrieving the action with id ${id}.`})
        })
})

// POST REQUEST
router.post('/', (req, res) => {
    const {project_id, description, notes, completed} = req.body;
    
    if(!project_id) {
        res.status(404).json({error: 'Please provide a project id for this action.'})
        return;
    }
    if(!description || description.length > 128) {
        res.status(400).json({error: 'Please provide a description for the new action that contains 1 - 128 characters.'})
        return;
    }

    actionModel.insert({project_id, description, notes, completed})
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json({error: 'The new action could not be created.'})
        })
})



module.exports = router;