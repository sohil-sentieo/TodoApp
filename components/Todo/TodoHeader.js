import { TODO_STORAGE_KEY } from "../../config.js";
import TodoCard from "../Todo.js";
import { parseViews } from "../../utils.js";
import ControlButtons from "./ControlButtons.js";

function handleOnCheck(label, isChecked, todoKey) {
  const todos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY));
  todos[todoKey].done = isChecked;
  todos[todoKey].pinned = false;
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  const todoCard = document.getElementById(`todo-card-${todoKey}`);
  todoCard.remove();
  if (isChecked) {
    const doneTodoList = document.getElementById("done-todo-view");
    const doneCard = TodoCard(label, "done", todos[todoKey], todoKey);
    doneTodoList.appendChild(doneCard);
  } else {
    const todoType = todos[todoKey].pinned ? "pinned" : "pending";
    const todoList = document.getElementById(`${todoType}-todo-view`);
    const todoCard = TodoCard(label, todoType, todos[todoKey], todoKey);
    todoList.appendChild(todoCard);
  }
  parseViews();
}

export default function TodoHeader(label, todoType, isChecked, todoKey) {
  const todoHeader = document.createElement("div");
  todoHeader.className = "todo-header";

  const start = document.createElement("div");
  const todoLabel = document.createElement("span");
  todoLabel.innerText = label;
  start.appendChild(todoLabel);

  //checkbox
  const todoChecked = document.createElement("input");
  todoChecked.addEventListener("change", () =>
    handleOnCheck(label, todoChecked.checked, todoKey)
  );
  todoChecked.type = "checkbox";
  todoChecked.checked = isChecked;

  start.appendChild(todoChecked);

  todoHeader.appendChild(start);

  //edit & pin button
  const end = ControlButtons(todoType, todoKey);
  todoHeader.appendChild(end);

  return todoHeader;
}
