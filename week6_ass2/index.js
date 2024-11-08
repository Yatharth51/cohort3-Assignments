const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
app.use(express.json());
const jwt = require("jsonwebtoken");
const JWT_SECRET = "IamPappu";
app.use(cors());
let users = [];

function auth_middleware(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        console.log("token needed for access");
        return;
    }
    else {
        jwt.verify(token, JWT_SECRET, (err, decode) => {
            if (err) {
                console.log("authorization needed");
            }
            else {
                req.user = decode;
                next();
            }
        })
    }
}

app.get('/todos', auth_middleware, (req, res) => {
    const token = req.headers.token;
    if (token) {
        const username = req.user.username;
        fs.readFile("/Users/yatharth51/Documents/web dev/Assignments solutions/week6_ass2/public/todos.json", 'utf8', (err, data) => {
            if (err) console.log("error reading file");
            else {
                const users1 = JSON.parse(data);
                console.log(users1);
                const currentuser = users1.find(u => u.username == username);
                console.log(currentuser);
                if (currentuser) {
                    res.send(
                        {
                            todos: currentuser.todos
                        }
                    );
                }
                else {
                    res.send({
                        msg: "user doesnt exist yet"
                    })
                }
            }
        })
    }

})

app.post('/add-todo', auth_middleware, (req, res) => {
    const token = req.headers.token;
    const todo = req.body.todo;
    if (token) {
        const username = req.user.username;
        fs.readFile("/Users/yatharth51/Documents/web dev/Assignments solutions/week6_ass2/public/todos.json", 'utf8', (err, data) => {
            if (err) console.log("error reading file");
            else {
                const users = JSON.parse(data);
                const currentuser = users.find(u => u.username == username);
                if (currentuser) {
                    currentuser.todos.push(todo);
                }
                else {
                    users.push({
                        "username": username,
                        "todos": [todo]
                    })
                }
                fs.writeFile("/Users/yatharth51/Documents/web dev/Assignments solutions/week6_ass2/public/todos.json", JSON.stringify(users), (err) => {
                    console.log(err);
                });
            }
        })
    }

})

app.use(express.static('public'));

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const found = users.find((u) => u.username == username);
    if (!found) {
        users.push({
            username,
            password
        })
        console.log("you are signed up");
        console.log(users);
        res.send({
            msg: "signedup"
        })
        return;
    }

    res.send({
        msg: "the same username already exists"
    })
})

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const foundUser = users.find(u => u.username == username && u.password == password);
    if (foundUser) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);
        if (token) {
            foundUser.token = token;
            res.json({
                msg: "signedin succesfully and token generated",
                token: token
            });
        }
        else {
            res.json({
                msg: "error generating token"
            });
        }
    }
    else {
        res.json({
            msg: "wrong email id or password entered"
        });
    }

})

app.get("/", (req, res) => {
    res.sendFile("/Users/yatharth51/Documents/web dev/Assignments solutions/week6_ass2/public/index.html");
})


app.listen(3000, () => {
    console.log("running on port 3000");
})