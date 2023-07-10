// URL of the main app, for example /about
const path=require('path')

const router = require("express").Router(); //Execute the method Router that facilitates the creation of routes

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/about', (req, res)=>{
    res.render('about');
});




module.exports=router;