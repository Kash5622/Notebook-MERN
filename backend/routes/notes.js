const express = require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchUser');
const Notes= require("../model/Notes");
const { body, validationResult } = require('express-validator'); 

// roter for fetch notes using get request
router.get('/getnotes',fetchuser, async (req,res)=>{
    try {
        const note=await Notes.find({user:req.user.id})
        res.json(note)
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

// router for creating notes using post request
router.post('/writenotes',fetchuser,[
    body("title", "Title should be at least 5 character").isLength(5),
    body("description", "Description should be at least 5 character").isLength(5),], async (req,res)=>{
        const error= validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).send("Enter valid details");
        }
        try {
            const {title,description,tag}=req.body;
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).send("Enter valid title or description");
            }
            const note= new Notes({
                title,description,tag,user:req.user.id,
            });
            const saveddata=await note.save();
            res.json(saveddata);
        }catch(error){
            console.log(error.message);
            res.status(500).send("Internal server error");
        }
});

// router for updating existing notes
router.put('/updatenotes/:id',fetchuser,[
    body("title", "Title should be at least 5 character").isLength(5),
    body("description", "Description should be at least 5 character").isLength(5),],async (req,res)=>{
        const error= validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).send("Enter valid details");
        }
    try {
        const {title,description,tag}=req.body;
        const newNotes={};
        if(title){newNotes.title=title};
        if(description){newNotes.description=description};
        if(tag){newNotes.tag=tag}
        // find the note and update
        let note= await Notes.findById(req.params.id);
        if(!note){
            return res.status(400).send("Enter valid details");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(400).send("Enter valid details");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes}, {new:true})
        res.json({note})
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

// deleting notes using delete request
router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
    try {
        // find the note and update
        let note= await Notes.findById(req.params.id);
        if(!note){
            return res.status(400).send("Enter valid details");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(400).send("Access denied");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success":"Note has been deleted",note:note})
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});



module.exports=router;