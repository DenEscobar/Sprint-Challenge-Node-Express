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

//PUT

//DELETE

server.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
});