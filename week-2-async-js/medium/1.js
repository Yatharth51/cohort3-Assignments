const fs = require("fs");


async function cleanFile(filename){
    fs.readFile(filename,"utf8",(err,data)=>{
        let data1 = data;
        console.log(data1);
        data1 = data1.trim();
        console.log(data1);
        fs.writeFile(filename,data1,(err)=>{});
    })
}


async function main() {
    await cleanFile("/Users/yatharth51/Documents/web dev/assignments/assignments/week-2/week-2-async-js/medium/a.txt");
    console.log("Done cleaning file");
 }
 
main();
