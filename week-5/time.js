let newarr = [1,2,3];
function func(input){
    return !(input%2);
}
let n = newarr.filter(func)
console.log(n);