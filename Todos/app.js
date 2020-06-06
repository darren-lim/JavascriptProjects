// selectors
// gets the part of the html containing the class names
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// functions
function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();
    // todo div
    const todoDiv = document.createElement("div");
    // add 'todo' into the class= part
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    // put text into the li
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    // sticks newTodo into the todoDiv
    todoDiv.appendChild(newTodo);

    // add todo to local storage
    saveLocalTodos(todoInput.value);

    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);

    // clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    // get clicked item
    // console.log(e.target);
    const item = e.target;
    // delete todo
    if (item.classList[0] === 'trash-btn') {
        // get parent of button, remove parent
        const todo = item.parentElement;
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    // check mark
    else if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        if (todo.classList !== undefined) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        }
        return;
    });
}

function saveLocalTodos(todo) {
    // check if todos are in local
    let todos = checkTodoStorage();
    // push the todo onto the array
    todos.push(todo);
    // save to local storage through json
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = checkTodoStorage();

    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        // add 'todo' into the class= part
        todoDiv.classList.add("todo");

        //create li
        const newTodo = document.createElement("li");
        // put text into the li
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        // sticks newTodo into the todoDiv
        todoDiv.appendChild(newTodo);

        // check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        // check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos = checkTodoStorage();
    // get the name of the todo
    // todo returns the div. children returns li
    const todoName = todo.children[0].innerText;
    // splice removes index from an array, second argument is how many items
    todos.splice(todos.indexOf(todoName), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function checkTodoStorage() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}
