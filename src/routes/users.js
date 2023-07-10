//the user can access to this routes to autenthicate /login or /sign in
const router = require("express").Router(); //Execute the method Router that facilitates the creation of routes

router.get('/users/signin', (req, res)=>{
    res.render('signin');
});

router.get('/users/signup', (req, res)=>{
    res.render('signup');
});


module.exports=router;