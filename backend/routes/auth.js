const express=require('express'); 
// import user model
const User= require("../model/User");
// import route
const router=express.Router(); 
// import express validator
const { body, validationResult } = require('express-validator'); 
// import bcrypt
const bcrypt = require('bcryptjs');
// import auth token
const jwt = require('jsonwebtoken');
const jwt_security="IamKaushik";
// import middleware
const fetchuser=require('../middleware/fetchUser');


// create regiatration
router.post('/createuser',
    // express validation
    body('name','Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({ min: 5 }),
    async (req,res)=>{
        // console.log(req.body);
        const errors= validationResult(req);
        let success= false;
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array(),success});
        }
        try{
        // check email already exist or not
        let user = await User.findOne({email: req.body.email});
        if(user){
           return res.status(400).json({error: "Sorry this email already exist",success})
        }
        // create salt for encryption
        const salt =await bcrypt.genSalt(10);
        // create encrypt or hash password
        const secPass = await bcrypt.hash(req.body.password,salt);
        // create document in mongo db
        user= await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })
        // console.log(user)
        // .then(user => res.json(user)).catch(err=>{console.log(err)
        // res.status(400).json({error: "please enter a unique value for email"})
        // });
        const data={
            user:{
                id: user.id,
            }
        }
        success=true;
        // console.log(user)
        const authtoken = jwt.sign(data,jwt_security);
        res.json({authtoken,success})
    } catch(error){
        console.log(error.message);
        let success=false;
        res.status(500).send({mag:"Some error occour",success});
    }
        
    },
);


// create login
router.post('/loginuser',
    body('email','enter valid credential').isEmail(),
    body('password','Password cannot be blank').exists(),
    async (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error: error.array(),success:success});
        }
        try{
            // destructor body's json
            const { email, password}= req.body;
            let user = await User.findOne({email});
            let success=false;
            if(!user){
                return res.status(400).json({msg:"Enter valid credential",success:success});
            }
            // compare bcrypt or hash password
            const passwordcompare =await bcrypt.compare(password,user.password);
            if(!passwordcompare){
                return res.status(400).json({msg:"Enter valid credential",success:success})
            }
            const data={
                user:{
                    id: user.id,
                }
            }
            // authtoken generate
            success=true;
            const authtoken = jwt.sign(data,jwt_security);
            res.json({authtoken:authtoken,success:success})
        }catch(error){
            console.log(error.message);
            res.status(500).send("Internal server error");
        }

    }
);
router.post('/fetchuser',fetchuser, async (req,res)=>{
        try {
            let userId=req.user.id;
            console.log(userId)
            const user =await User.findById(userId).select("-password");
            res.send(user);
        } catch(error){
            console.log(error.message);
            res.status(500).send("Internal server error");
        }
    }
)
// export router
module.exports=router; 