
const { Command } = require('commander');
const program = new Command();
const fs = require ("fs");
program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

  program.command("words").argument('<path>').action(
    (path)=>{
        fs.readFile(path,'utf8',(err,data)=>{
            if (data){
                let arr = data.split(" ");
                console.log(arr);
                console.log(arr.length);
            }
            else{
                console.log(err);
            }
        });
    }
  )
  console.log(process.argv);

program.parse();