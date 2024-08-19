/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    let arr = str.trim().toLowerCase().split("");
    let cnt = 0;
    arr.forEach(char=>{
      if (char=='a' || char=='e' || char=='i' || char== 'o' || char=='u') cnt++;
    });
    return cnt;
}

module.exports = countVowels;