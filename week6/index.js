const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "IloveRiya" ;
app.use(express.json());

let users = [

] ;


app.post("/signin",(req,res)=>{
    const username = req.body.username ;
    const password = req.body.password ; 
    const currentUser = users.find((u)=> {return (u.username==username && u.password == password)}) ;
    if (currentUser){   
        const token = jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            username : currentUser.username,
            password : currentUser.password,
            user_token : token
        })
    }
    else{
        res.json({
            message : "invalid username or password"
        })
    }
})

app.post("/signup",(req,res)=>{
    const username = req.body.username ;
    const password = req.body.password ; 
    users.push({
        username,
        password
    }) ;
    res.send("user signed up succesfully") ;
})

app.post("/me",(req,res)=>{
    const token = req.headers.token ;
    const decoded_username = jwt.verify(token,JWT_SECRET) ;
    const currentUser = users.find((u)=>{return decoded_username.username == u.username});
    if (currentUser){
        res.json({
            username : currentUser.username,
            password : currentUser.password,
            user_token : token
        });
        return;
    }
    else{
        res.json({
            message : "Invalid Token"
        }) ;
    }
})

app.listen(3000,()=>{
    console.log("http server running on port 3000");
});