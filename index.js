const express = require('express');

const projectDb = require('./data/helpers/projectModel')
const actionDb = require('./data/helpers/actionModel')

const server = express();
const parser = express.json();
const PORT = 5000;

server.use(parser)

//GET

//POST

//PUT

//DELETE

server.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
});