const express = require ("express");
const app = express();
let reqcount = 0 ;

function middleware(req,res,next){
    console.log("method is : " + req.method);
    console.log("url is : " + req.url);
    const p  = new Date();
    console.log("date is : " + p.toString());
    next();
}



app.get('/multiply',middleware,(req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b) ;
    const c = a*b ;
    res.json({
        ans : c
    });
} )

app.get('/add',middleware,(req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b) ;
    const c = a+b ;
    res.json({
        ans : c
    });
} )


app.get('/divide',(req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b) ;
    const c = a/b ;
    res.json({
        ans : c
    });
} )

app.get('/subtract',(req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b) ;
    const c = a-b ;
    res.json({
        c
    });
} )

app.listen(3000);
