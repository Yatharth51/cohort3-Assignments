const fs = require("fs");

function onDone(data) {
    console.log(data);
  }
  
function onError(err) {
    console.log( err);
}

function readFilePromisifeid(filePath){
    return new Promise ((resolve,reject)=>{
        fs.readFile(filePath,"utf8",(err,data)=>{
            if (err){
                reject(err);
            }
            else resolve(data);
        })
    })
}

let filePath = "/Users/yatharth51/Documents/web dev/assignments/assignments/week-2/week-2-async-js/medium/a.txt";

readFilePromisifeid(filePath).then(onDone).catch(onError);