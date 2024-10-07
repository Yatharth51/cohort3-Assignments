
const express = require ("express");
const app = express();
const fs = require("fs");
app.use(express.json());



function read(){
    let data = fs.readFileSync("todos.json","utf8") ;
    data = JSON.parse(data);
    return data ;

}


function write(data){
    data = JSON.stringify(data);
    fs.writeFile('todos.json',data,(err)=>{
        if (err) console.log(err);
        else console.log("written succesfully");
    })
}

let cnt = 2;

app.get('/',(req,res)=>{
    const data = read();
    res.send(data);
})

app.post('/',(req,res)=>{
    const data = req.body.task ;
    const obj = {
        id: cnt,
        task : data
    }
    let todos = read();
    todos.push(obj);
    cnt++;
    write(todos);
    res.send(todos);
})

app.put('/',(req,res)=>{
    const index = req.body.num ;
    const data = req.body.task;
    const obj = {
        id :index,
        task : data 
    }
    let todos = read();
    todos[index-1]=obj;
    write(todos);
    res.send(todos);
})

app.delete('/', (req,res)=>{
    const index = req.body.num ;
    let todos = read();
    todos.splice((index-1),1);
    write(todos);
    res.send(todos);
})


app.listen(3000);