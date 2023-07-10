const mongoose=require('mongoose');
const {Schema}=mongoose;

// This is to tell how the data stored in the database would look like
const NoteSchema=new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    date:{type:Date, default: Date.now }
});

module.exports=mongoose.model('Note', NoteSchema); //This automaticalle creates a collection called "node" which comes from 'Node' but lowercased