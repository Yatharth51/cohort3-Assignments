let cnt = 0;

// function print(){
//     console.clear();
//     console.log(cnt);
//     cnt++;
//     setTimeout(print, 0);
// }

// function setTimeoutPromise(ms){
//     return new Promise((resolve)=>{
//         setTimeout(resolve,ms);
//     });
// }
// setTimeoutPromise(0).then(print);

function print(){
    console.clear();
    console.log(cnt);
    cnt++;
}


setInterval(print,1000);
