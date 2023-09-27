import { TODOS } from "./utils.js";
import AddTodo from "./components/AddTodo.js";
import NavigationBar from "./components/NavigationBar.js";
import TodoList from "./components/TodoList.js";

const root = document.getElementById("root");

// heading
const heading = document.createElement("h1");
heading.innerText = "TodoList";
heading.className = "header";
root.appendChild(heading);

// body ()
const bodyContainer = document.createElement("div");
bodyContainer.className = "body-container";
root.appendChild(bodyContainer);

const mainContainer = document.createElement("main");
mainContainer.className = "container";
bodyContainer.appendChild(mainContainer);

const addTodoBar = AddTodo();
mainContainer.appendChild(addTodoBar);

const navBar = NavigationBar();
mainContainer.appendChild(navBar);

// horizontal rule
mainContainer.appendChild(document.createElement("hr"));

let todos = JSON.parse(localStorage.getItem("todo"));
todos = todos !== null ? todos : [];

const pendingTodos = TodoList("pending", TODOS);
mainContainer.appendChild(pendingTodos);

const sideContainer = document.createElement("div");
sideContainer.className = "container";
bodyContainer.appendChild(sideContainer);

const pinnedContainer = TodoList("pinned", TODOS);
sideContainer.appendChild(pinnedContainer);

const doneContainer = TodoList("done", TODOS);
sideContainer.appendChild(doneContainer);
