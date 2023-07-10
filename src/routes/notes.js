//Only the urls so the user can manage their notes
const router = require("express").Router(); //Execute the method Router that facilitates the creation of routes
const Note=require('../models/Note');

router.get('/notes/add', (req, res)=>{
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res)=>{ //async to indicate this function has asynchronous activities
    const {title, description}=req.body;
    const errors=[];
    if(!title){
        errors.push({text: 'Please Write a Title'})
    }
    if(!description){
        errors.push({text: 'Please Write a description'})
    }
    if(errors.length>0){
        res.render('notes/new-note',{
            errors, 
            title,
            description
        });
    }else{
        //SEND FORM DATA TO THE DATABASE
        const newNote=new Note({title, description});
        await newNote.save()//this could take time saving in the database so it is async
        req.flash('success_msg', 'Note Added Successfully');
        res.redirect('/notes');

    }
    console.log(title, description);
});

router.get('/notes', async (req, res)=>{
    const notes=await Note.find().lean();
    res.render('notes/all-notes',{notes});
});

router.get('/notes/edit/:id', async (req, res)=>{
    const note=await Note.findById(req.params.id).lean();
    res.render('notes/edit-note',{note});
});


router.put('/notes/edit-note/:id', async (req, res)=>{
    const {title, description}= req.body;
    const note=await Note.findByIdAndUpdate(req.params.id, {title, description}).lean();
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id).lean();
    res.redirect("/notes");
});


module.exports=router;