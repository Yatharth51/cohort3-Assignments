const express = require ("express");
const app = express();

app.get('/multiply',(req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b) ;
    const c = a*b ;
    res.json({
        ans : c
    });
} )

app.get('/add',(req,res)=>{
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
