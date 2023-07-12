const passport = require("passport");
const LocalStrategy=require('passport-local');
const User=require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done)=>{
    const user=await User.findOne({email:email});
    if(!user){
        return done(null, false,{message: 'Not User found'});
        //done callback format done (error, userFound,{message:message} )
    }else{
        const match=await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false,{message:'Incorrect Password'});
        }
    }
}));

//Method so everytime the user visits a new page it wont ask his email and password again
passport.serializeUser((user, done) =>{
    done(null, user.id);
});

//Method if there is a user logged in you search the user and if found is returned with the callback or if not then return the error
passport.deserializeUser((id, done) =>{
    const user=User.findById(id);
    if (user){
        done(null, user)
    }else{
        done(err, user)
    }
    
});