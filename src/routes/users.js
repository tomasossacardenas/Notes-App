//the user can access to this routes to autenthicate /login or /sign in
const router = require("express").Router(); //Execute the method Router that facilitates the creation of routes
const passport = require("passport");
const User=require('../models/User');

router.get('/users/signin', (req, res)=>{
    res.render('users/signin');
});

router.get('/users/signup', (req, res)=>{
    res.render('users/signup');
});

router.post('/users/signup', async (req, res)=>{
    const {name, email,password, confirm_password}=req.body;
    const errors=[];
    if(password!= confirm_password){
        errors.push({text:'Passwords does not match'});
    }
    if(password.length<4){
        errors.push({text:'Password nust be larger than 4 characters'});
    }
    if (errors.length>0){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else{
        const emailUser=await User.findOne({email:email});
        if(emailUser){
            req.flash("error_msg", "The Email is already in use.");
            return res.redirect("/users/signup");
        }else{
            const newUser=new User({name, email, password})
            newUser.password=await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Signed in Successfully');
            res.redirect('/users/signin');
        }

    }
});

router.post('/users/signin', passport.authenticate('local',{
    successRedirect:'/notes',
    failureRedirect:'/users/signin',
    failureFlash:true
}));

router.get('/users/logout', async (req, res, next) => {
    await req.logOut((err) => {
      if (err) return next(err);
      req.flash("success_msg", "You are logged out now.");
      res.redirect("/users/signin");
    });
});


module.exports=router;