//Only the urls so the user can manage their notes
const router = require("express").Router(); //Execute the method Router that facilitates the creation of routes
const Note=require('../models/Note');
const{isAuthenticated}=require('../helpers/auth');

//isAuthenticated acts as a middleware so if it is not authenticated then it redirects to the signin
router.get('/notes/add', isAuthenticated, (req, res)=>{
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res)=>{ //async to indicate this function has asynchronous activities
    const {title, description}=req.body;
    const errors=[];
    if(!title){
        errors.push({text: 'Please Write a Title'})
    }
    if(!description){
        errors.push({text: 'Please Write a description'})
    }
    if(errors.length>0){
        return res.render('notes/new-note',{
            errors, 
            title,
            description
        });
    }else{
        //SEND FORM DATA TO THE DATABASE
        user = await req.user.lean().exec(); //To get the user, if use only req.user it will give a mongoose query object instead of the actual user object thats why we use leand and exec
        const newNote = new Note({ title, description, user:user._id });
        await newNote.save();
        req.flash("success_msg", "Note Added Successfully");
        res.redirect("/notes");

    }
});

router.get('/notes', isAuthenticated, async (req, res)=>{
    user = await req.user.lean().exec();

  // Ensure user exists
  if (!user) {
    // Handle the case where the user is not found
    return;
  }

  const notes = await Note.find({ user: user._id })
    .sort({ date: 'desc' })
    .lean();

  res.render('notes/all-notes', { user, notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res)=>{
    const note=await Note.findById(req.params.id).lean();
    res.render('notes/edit-note',{note});
});


router.put('/notes/edit-note/:id', isAuthenticated,async (req, res)=>{
    const {title, description}= req.body;
    const note=await Note.findByIdAndUpdate(req.params.id, {title, description}).lean();
    req.flash('success_msg','Note Updated Successfully')
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg','Note Deleted Successfully')
    res.redirect("/notes");
});


module.exports=router;