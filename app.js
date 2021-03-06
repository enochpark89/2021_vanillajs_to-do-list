const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");

// find the first input inside the toDoForm.
const toDoInput = toDoForm.querySelector("input");

const TODOS_KEY = "todos";
let toDos = [];

// saves the toDos array into the localStorage of a browser. (NOTE: it takes in "todos" as a key and array of string values as a whole string delimited by commas.)
function saveToDos() {
   localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
   // save the value as an array format yet still it is a string.
}

function deleteToDo(event) {
   // Get the parentNode of a button and delete.
   const li = event.target.parentElement;
   console.log(li.id);
   li.remove();
   // keep the ones that are not selected to delete.
   toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
   saveToDos();
}

function paintToDo(newTodo) {
   // create a new HTML element (li and span) with the text parameter newTodo.
   const li = document.createElement("li");
   li.id = newTodo.id;
   const span = document.createElement("span");
   span.innerText = newTodo.text;
   const deleteButton = document.createElement("button");
   deleteButton.innerText = " ❌";
   deleteButton.addEventListener("click", deleteToDo);
   li.appendChild(span);
   li.appendChild(deleteButton);

   // append to the toDoList
   toDoList.appendChild(li);
}

function handletoDoSubmit(event) {
   // enter does not refresh
   event.preventDefault();

   // TEST: success in return input value: console.log(toDoInput.value);

   // Assign the input value to a constant newTodo and delete the input value.
   const newTodo = toDoInput.value;
   toDoInput.value = "";
   // create newTodoObj that contains text and id.
   const newTodoObj = {
      text: newTodo,
      id: Date.now(),
   };
   //
   toDos.push(newTodoObj);
   paintToDo(newTodoObj);
   saveToDos();
}

toDoForm.addEventListener("submit", handletoDoSubmit);

// get the savedToDos from the localStorage.
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
   // turn the saved ToDo string into a live object

   const parsedToDos = JSON.parse(savedToDos);
   toDos = parsedToDos;
   // paint each item todo.
   parsedToDos.forEach(paintToDo);
}

// filter will filter item that returns false.
// filter does not return a previous array.
