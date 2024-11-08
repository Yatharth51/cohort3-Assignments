
async function signup(){
    const username = document.getElementById("signup-username").value ;
    const password = document.getElementById("signup-password").value ;
    const response = await axios.post("http://localhost:3000/signup",{
        username,
        password
    }) ;
    console.log("signed up");
    alert("you have signed up");
}

function renderLoginButton(){
     
     let newDiv = document.getElementById("additional-div");
     let newButton = document.createElement("button");
     newButton.setAttribute("id", "logout-button");
     newButton.setAttribute("onclick", "logout()");
     newButton.textContent = "Logout"; 
     newDiv.appendChild(newButton);
     let newInput = document.createElement("input") ;
     newInput.setAttribute("type","text");
     newInput.setAttribute("placeholder","Enter Todo");
     newInput.setAttribute("id","todo-input");
     newButton = document.createElement("button");
     newButton.innerText = "ADD-todo";
     newButton.setAttribute("onclick", "addtodo()");
     newDiv.appendChild(newInput);
     newDiv.appendChild(newButton);
     let newButton2 = document.createElement("button");
     newButton2.innerText = "Render-todos";
     newButton2.setAttribute("onclick", "renderTodos()");
     newDiv.appendChild(newButton2);
     
}

async function addtodo(){
    const token = localStorage.getItem("token");
    const todo = document.getElementById("todo-input").value ;
    await axios.post("http://localhost:3000/add-todo",{
        todo
    },{
        headers:{
            "token":token
        }
    }); 
    console.log("todo added successfully");
}

async function renderTodos(){
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/todos",{
        headers :{
            "token":token
        }
    });
    // document.getElementById('todos-div').innerHTML = "";
    const todos1 = response.data.todos ;
    console.log(todos1);
    for (let i = 0 ; i < todos1.length ; i++){
        const newdiv = document.createElement('div');
        newdiv.setAttribute('id',`todo-${i+1}`);
        newdiv.textContent = `${i+1}. ${todos1[i]}`;
        document.getElementById('todos-div').appendChild(newdiv);
    }
}


async function login(){
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    try {
        const response = await axios.post("http://localhost:3000/signin", {
            username,
            password
        });

        // Check if the response contains a token
        if (!response.data.token) {
            alert("Wrong username or password");
        } else {
            // alert("You have signed in");
            console.log("signed in");
            const token = response.data.token;
            console.log(token);
            localStorage.setItem("token", token);
            renderLoginButton();
            // renderTodoAdd();
            // renderTodos(username) ;
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred while signing in");
    }
   
}

async function logout(){
    localStorage.removeItem("token");
    document.getElementById("additional-div").innerHTML = "";
    const todos_div = document.createElement("div") ;
    todos_div.setAttribute("id","todos-div");
    document.getElementById("additional-div").appendChild(todos_div);
    return ;
}