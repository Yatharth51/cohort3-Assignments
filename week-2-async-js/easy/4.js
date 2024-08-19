const fs = require("fs");
let data = "hello";
fs.writeFile("/Users/yatharth51/Documents/web dev/assignments/assignments/week-2/week-2-async-js/easy/a.txt",data,(err)=>{

});
fs.readFile("/Users/yatharth51/Documents/web dev/assignments/assignments/week-2/week-2-async-js/easy/a.txt","utf8",(err,data)=>{
    console.log(data);
})