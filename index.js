const express = require('express');

const projectDb = require('./data/helpers/projectModel')
const actionDb = require('./data/helpers/actionModel')

const server = express();
const parser = express.json();
const PORT = 5000;

server.use(parser)

//GET Project

server.get('/projects', (req, res) =>{
    projectDb.get()
    .then( projects =>{
        res
        .status(200)
        .json(projects)
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The project information could not be retrieved"})
    })
})

server.get('/projects/:id', (req, res) =>{
    const { id } = req.params
    projectDb.get(id)
    .then( project =>{
        if(project){
            res
            .status(200)
            .json(project)
        } else {
            res
            .status(404)
            .json({error: "The project with the specified ID does not exist"})
        }  
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The project information could not be retrieved"})
    })
})

//GET Actions

server.get('/actions', (req, res) =>{
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

server.get('/actions/:id', (req, res) =>{
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


//POST project

server.post('/projects', (req, res) =>{
    const project = req.body
    if(project.name && project.description && project.completed){
        projectDb.insert(project)
        .then(idInfo =>{
            projectDb.get(idInfo.id)
            .then(newProject =>{
                res
                .status(201)
                .json({message: `New Project, ${project.name}, created`})
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
            .json({error: "There was an error while saving your project to the database"})
        })
    } else {
        res
        .status(400)
        .json({errorMessage: "Please provide the details of the project"})
    }
})

//POST Actions

server.post('/actions', (req, res) =>{
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

//PUT

server.put('/projects/:id', (req, res) =>{
    const  { id } = req.params
    const project = req.body
    projectDb.update(id, project)
    .then( idInfo =>{
        console.log(idInfo)
        if(idInfo !== null){
            if(project.name && project.description && project.completed){
                res
                .status(200)
                .json({message: "Project information updated"})
            } else{
                res
                .status(400)
                .json({errorMessage: "Please provide information to update project"})
            }
        } else {
            res
            .status(404)
            .json({error: "The project with the specified id does not exist"})
        }
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The project information could not be modified"})
    })
})

//PUT Actions

server.put('/actions/:id', (req, res) =>{
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

//DELETE

server.delete('/projects/:id', (req, res) =>{
    const { id } = req.params
    projectDb.remove(id)
    .then(count =>{
        if(count === 1){
            res
            .status(200)
            .json({message: `Project ID:${id} deleted`})
        } else {
            res
            .status(404)
            .json({message: "The project with the specified ID does not exist"})
        }
    })
    .catch( err =>{
        res
        .status(500)
        .json({error: "The project could not be removed"})
    })
})

server.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
});