'use strict';

const express =require('express');
const cors =require('cors');
require('dotenv').config();
const axios=require('axios');


const server =express();
server.use(cors());
server.use(express.json());

const PORT =process.env.PORT;

server.get('/getData',getDataHandler);

function getDataHandler(req,res) {
    console.log(req.query);
    const search =req.query.q;

    const url=`https://digimon-api.herokuapp.com/api/${search}`;
    axios.get(url).then(result=>{
     const digimonArr=result.data.map(digimon=>{
         return new Digon(digimon);
     })
     res.send(digimonArr);
    })
}

class Digon{
    constructor(digimon){
        this.name=digimon.name;
        this.img=digimon.img;
        this.level=digimon.level;
    }
}
server.listen(PORT,()=>{
    console.log(`hello from ${PORT}`);
})