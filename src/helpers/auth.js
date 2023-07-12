const helpers={};

//Lets check if there is a current session
helpers.isAuthenticated=(req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/signin");
  };

module.exports=helpers;