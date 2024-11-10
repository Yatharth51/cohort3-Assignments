const bcrypt = require("bcrypt");

async function hashedPass(plainPassword){
    const hashedpassword = await bcrypt.hash(plainPassword,10);
    return hashedpassword ;
}

async function verifyPassword(plain,hashed){
    const isMatch = await bcrypt.compare(plain,hashed) ;
    return isMatch ;
}

module.exports = {
    hashedPass,
    verifyPassword
} ;
