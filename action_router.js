const express = require('express');

const server = express();
const router = express.Router();



//GET Actions

server.get('/', (req, res) =>{
    actionDb.get()
    .then( actions =>{
        res
        .status(200)
        .json(actions)
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The actions could not be retrieved"})
    })
})

server.get('/:id', (req, res) =>{
    const { id } = req.params
    actionDb.get(id)
    .then( action =>{
        if(action){
            res
            .status(200)
            .json(action)
        } else {
            res
            .status(404)
            .json({error: "The action with the specified ID does not exist"})
        }
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The actions could not be retrieved"})
    })
})


//POST Actions

server.post('/', (req, res) =>{
    const action = req.body
    if(action.project_id && action.description && action.notes && action.completed){
        actionDb.insert(action)
        .then(idInfo =>{
            actionDb.get(idInfo.id)
            .then(newAction =>{
                res
                .status(201)
                .json({message: "New Action created"})
            })
            .catch(err =>{
                res
                .status(400)
                .json({error: "There was an error"})
            })
        })
        .catch(err=>{
            res
            .status(500)
            .json({error: "There was an error while saving your action to the database"})
        })
    } else {
        res
        .status(400)
        .json({errorMessage: "Please provide the details of the action"})
    }
})

//PUT Actions

server.put('/:id', (req, res) =>{
    const  { id } = req.params
    const project = req.body
    console.log(id, project)
    actionDb.update(id, project)
    .then( idInfo =>{
        console.log(idInfo)
        if(idInfo !== null){
            if(action.project_id && action.description && action.notes && action.completed){
                res
                .status(200)
                .json({message: "Action information updated"})
            } else{
                res
                .status(400)
                .json({errorMessage: "Please provide information to update action"})
            }
        } else {
            res
            .status(404)
            .json({error: "The action with the specified id does not exist"})
        }
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The actions information could not be modified"})
    })
})

//Delete Actions

server.delete('/:id', (req, res) =>{
    const { id } = req.params
    actionDb.remove(id)
    .then(count =>{
        if(count === 1){
            res
            .status(200)
            .json({message: `Action ID:${id} deleted`})
        } else {
            res
            .status(404)
            .json({message: "The action with the specified ID does not exist"})
        }
    })
    .catch( err =>{
        res
        .status(500)
        .json({error: "The action could not be removed"})
    })
});



module.exports = router;