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
    console.log(id)
    projectDb.get(id)
    .then( project =>{
        if(project){
            res
            .status(200)
            .json(project)
        } else {
            res
            .status(404)
            .json({error: "The project with the specified if does not exist"})
        }  
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The project information could not be retrieved"})
    })
})

//POST

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

//PUT

server.put('/projects/:id', (req, res) =>{
    const  { id } = req.params
    console.log(id)
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
            .json({error: "The user with the specified id does not exist"})
        }
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The project information could not be modified"})
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