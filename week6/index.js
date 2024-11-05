const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "IloveRiya" ;
app.use(express.json());
const cors = require("cors");
app.use(cors());
let users = [

] ;

function auth_middleware(req,res,next)
{
    const token = req.headers.token ;
    if (token){
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if (err){
                res.status(401).send({
                    message : "unauthorized"
                })
            }
            else{
                req.user = decoded;
                next();
            }
        })
    }
    else{
        res.status(401).send({
            message : "unauthorized"
        })
    }

}

app.get("/",(req,res)=>{
    res.sendFile("/Users/yatharth51/Documents/web dev/Assignments solutions/week6/public/index.html");
})

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

app.get("/me",auth_middleware,(req,res)=>{
    const user = req.user ;
    res.json({
        username : user.username
    })
})
app.listen(3000,()=>{
    console.log("http server running on port 3000");
});