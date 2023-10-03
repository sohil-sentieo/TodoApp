import { createInput, createButton } from "../utils.js";
import { TodoCard } from "./Todo.js";

function handleAddTodo(inputTag) {
  const todoKey = Date.now().toString();
  const todo = {};
  todo[todoKey] = {
    text: inputTag.value,
    pinned: false,
    done: false,
    created_at: new Date(),
    updated_at: null,
  };

  if ("todos" in localStorage) {
    const currentTodo = JSON.parse(localStorage.getItem("todos"));
    localStorage.setItem("todos", JSON.stringify({ ...currentTodo, ...todo }));
  } else {
    localStorage.setItem("todos", JSON.stringify(todo));
  }
  const todoCount =
    document.getElementById("pending-todo-view").children.length + 1;
  const pendingTodoList = document.getElementById("pending-todo-view");
  const todoCard = TodoCard(todoCount, "pending", todo[todoKey], todoKey);
  pendingTodoList.appendChild(todoCard);
  inputTag.value = "";
}

export default function AddTodo() {
  const div = document.createElement("div");

  // add todo content
  const addInput = createInput(
    "text",
    "Add Item",
    "add-input",
    "add-todo-input"
  );
  div.appendChild(addInput);

  // add button
  const submit = createButton("Add", "button");
  submit.addEventListener("click", () => handleAddTodo(addInput));
  div.appendChild(submit);

  return div;
}
