const route = require('express').Router();

route.get('/',(req,res)=>{
    res.json("response from folder get");
})

module.exports = route;