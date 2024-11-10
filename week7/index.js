const express = require("express");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const {z} = require("zod");
const {auth,JWT_Secret} = require('./auth') ;
const {hashedPass,verifyPassword } = require('./hashing') ;
const {usermodel,todomodel} = require('./database');
const app = express();
app.use(express.json());


mongoose.connect('mongodb+srv://yatharth51:Q1o61YI2n7ZHaQMW@cluster0.5sxgl.mongodb.net/Todo-test') ;

app.post('/signup',async (req,res)=>{
    const requiredBody = z.object({
        email : z.string().min(3).max(100).email(),
        password : z.string().min(5).max(100).refine((val)=>/[A-Z]/.test(val)),
        username : z.string()
    })

    const ParsedWithSuccess = requiredBody.safeParse(req.body) ;
    if (!ParsedWithSuccess.success){
        res.json({
            msg : "failed signup due to incorrect format",
            error : ParsedWithSuccess.error
        });
        return ;
    }

    const email = req.body.email; 
    const password = req.body.password;
    const hashed = await hashedPass(password) ;
    const username = req.body.username ;
    try{
        const response = await usermodel.create({
        email: email,
        password : hashed,
        username : username
    }) ;
    res.json({
        response,
        msg : "signed up succesfully"
    })
    }
    catch(e){

        res.json({
            msg : "redundant email"
        })
    }
    
})

app.post('/signin',async (req,res)=>{
    const email = req.body.email; 
    const password = req.body.password;
    const response = await usermodel.findOne({
        email: email,
    }) ;
    const isverified = await verifyPassword(password,response.password);
    if (isverified){
        const token = jwt.sign({
            id : response._id
        },JWT_Secret)
        res.json({
            token : token
        })
    }
    else{
        res.json({
            msg : "wrong credentials" 
        });
    }
})

app.post('/add-todo',auth,async (req,res)=>{
    const userid = req.userid ;
    const todo_title = req.body.title ;
    await todomodel.create({
        userid : userid,
        Title : todo_title,
        done : false
    });
    res.json({
        msg : "todo-added"
    })
}); 

app.get('/todos',auth,async (req,res)=>{
    const userid = req.userid ;
    console.log(userid);
    const todos = await todomodel.find({
        "userid" : userid
    })
    
})


app.listen(3000);