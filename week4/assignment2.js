const fs = require ("fs");
const {Command} = require("commander");
const program = new Command();


function read(path){
    let data = fs.readFileSync(path,'utf8');
    data = JSON.parse(data);
    return data;
}

function write(data){
    fs.writeFile('todos.json',  JSON.stringify(data),(err)=>{
        if (err){
            console.log("error found");
        }
        else{
            console.log("file written succesfully");
        }
    });
}

function add_todo(string){
        let d = read('todos.json');
        let obj = {
            "id":(d[d.length-1].id)+1,
            "task": string,
            "done":false
        }
        d.push(obj);
        write(d);
}

function markasdone(id){
    let d = read('todos.json');
    d[id-1].done= true;
    write(d);
}

function delete_todo(id){
    let d = read('todos.json');
    d.splice(id-1,1);
    write(d);
}

program.command("add").argument('<task>','task to add').action(
    string=>{
        add_todo(string);
    }
)

program.command("mark").argument('<id>','task to be marked as done').action(
    id=>{
        markasdone(id);
    }
)

program.command("delete_todo").argument('<id>','task to be deleted').action(
    id=>{
        delete_todo(id);
    }
)

program.parse();