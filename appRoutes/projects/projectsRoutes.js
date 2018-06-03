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
        res.status(400).json({error: 'Please provide a name for the project that contains 1 - 128 characters'})
        return;
    }
    if(!description || description.length > 128) {
        res.status(400).json({error: 'Please provide a description for the project that contains 1 - 128 characters'})
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

// DELETE REQUEST
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    projectModel.remove(id)
        .then(response => {
            // console.log(response) // 1 === success , 0 === fail
            if(response) {
                res.json({success: `Project with id ${id} was successfully deleted.`})
            } else {
                res.status(404).json({error: `Project with id ${id} does not exist`})
            }    
        })
        .catch(error => {
            res.status(500).json({error: 'The Project could not be deleted.'})
        })
})

// PUT REQUEST
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {name, description, completed} = req.body;

    if(name.length < 1 || name.length > 128) {
        res.status(400).json({error: 'Please provide a name that is 1 - 128 characters long.'})
        return;
    }
    if(description.length < 1 || description.length > 128) {
        res.status(400).json({error: 'Please provide a description that is 1 - 128 characters long.'})
        return;
    }
    
    projectModel.update(id, {name, description, completed})
        .then(response => {
            // console.log(response)
            res.json(response)
        })
        .catch(error => {
            res.status(500).json({error: 'The project could not be updated.'})
        })
})

// GET REQUEST FOR PROJECT'S ACTIONS
router.get('/:id/actions', (req, res) => { 
    const { id } = req.params;

    projectModel.getProjectActions(id)
        .then(actions => {
            // console.log(actions)
            if(actions.length === 0) { //if actions is an empty array...
                res.status(404).json({error: `Project with id ${id} does not exist or does not contain any actions.`})
                return;
            }
                res.json(actions)
        })
        .catch(error => {
            res.status(500).json({error: 'The actions for the project could not be retrieved.'})
        })
})


module.exports = router;