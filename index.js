import { TODOS } from "./utils.js";
import AddTodo from "./components/AddTodo.js";
import NavigationBar from "./components/NavigationBar.js";
import parseTodoView from "./components/TodoList.js";

const root = document.getElementById("root");

// heading
const heading = document.createElement("h1");
heading.innerText = "TodoList";
heading.className = "app-header";
root.appendChild(heading);

// body ()
const bodyContainer = document.createElement("div");
bodyContainer.className = "app-body-container";
root.appendChild(bodyContainer);

const mainContainer = document.createElement("main");
mainContainer.className = "main-container";
bodyContainer.appendChild(mainContainer);

const addTodoBar = AddTodo();
mainContainer.appendChild(addTodoBar);

const navBar = NavigationBar();
mainContainer.appendChild(navBar);

// horizontal rule
mainContainer.appendChild(document.createElement("hr"));

const pendingView = document.createElement("div");
pendingView.id = "pending-todo-container";
mainContainer.appendChild(pendingView);
parseTodoView("pending", pendingView);

const sideContainer = document.createElement("div");
sideContainer.className = "main-container";
bodyContainer.appendChild(sideContainer);

const pinnedContainer = document.createElement("div");
pinnedContainer.id = "pinned-todo-container";
sideContainer.appendChild(pinnedContainer);
parseTodoView("pinned", pinnedContainer);

const doneContainer = document.createElement("div");
doneContainer.id = "done-todo-container";
sideContainer.appendChild(doneContainer);
parseTodoView("done", doneContainer);
