const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const ObjectId = mongoose.ObjectId ;

const User = new Schema({
    email : {
        type : String,
        unique : true
    },
    username : {
        type : String
    },
    password : String,
}) ;

const Todo = new Schema({
    userid : ObjectId,
    Title : String,
    done : Boolean
}) ;

const usermodel = mongoose.model('users',User);
const todomodel = mongoose.model('todos',Todo);

module.exports={
    usermodel,
    todomodel
} ;

