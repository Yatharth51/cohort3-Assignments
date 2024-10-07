const express = require ("express")
const app = express();

let reqcount = 0 ;

function incReq(req,res,next){
    reqcount++;
    next();
}

app.use(incReq);

app.get("/req1",(req,res)=>{
    res.status().json({
        reqcount
    })
})

app.get('/ride1 ', (req,res)=>{
    res.send("you have successfully rode ride 1")
})
app.get('/ride2', (req,res)=>{
    res.send("you have successfully rode ride 2")
})

app.listen(3000);