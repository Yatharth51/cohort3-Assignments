const fs = require("fs");

function renderTodos(username){
  fs.readFile ("/Users/yatharth51/Documents/web dev/Assignments solutions/week6_ass2/public/todos.json",'utf8',(err,data)=>{
    if (err)console.log("error reading file");
    else{
        const users = JSON.parse(data);
        const todos = users.find(u=>u.username== username) ;
        todoslist = todos.todos ;
        console.log(todoslist);
    }
})
}

renderTodos("pap");