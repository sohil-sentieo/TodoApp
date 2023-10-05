import { createButton } from "../../utils.js";
import { TODO_STORAGE_KEY, EDITING_TODO_KEY } from "../../config.js";
import TodoCard from "../Todo.js";
import { parseViews } from "../../utils.js";

function editOnClickHandler(todoKey) {
  const modal = document.getElementById("todo-edit-modal");
  modal.classList.remove("hidden");
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("hidden");

  const todoContent = document
    .getElementById(`todo-card-${todoKey}`)
    .getElementsByClassName("todo-content")[0].innerHTML;

  const editor = window.editor;
  editor.setData(todoContent);

  localStorage.setItem(EDITING_TODO_KEY, todoKey);
}

function pinOnClickHandler(todoKey) {
  const newTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY));
  newTodos[todoKey].pinned = true;

  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(newTodos));

  const currentCard = document.getElementById(`todo-card-${todoKey}`);
  currentCard.remove();
  const pinnedTodoList = document.getElementById(`pinned-todo-view`);
  const pinnedCount = pinnedTodoList.children.length;
  const todoCard = TodoCard(
    pinnedCount + 1,
    "pinned",
    newTodos[todoKey],
    todoKey
  );

  pinnedTodoList.appendChild(todoCard);
  parseViews();
}

function unpinOnClickHandler(todoKey) {
  const newTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY));
  newTodos[todoKey].pinned = false;

  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(newTodos));

  const currentCard = document.getElementById(`todo-card-${todoKey}`);
  currentCard.remove();
  const pendingTodoList = document.getElementById("pending-todo-view");
  const pendingCount = pendingTodoList.children.length;
  const todoCard = TodoCard(
    pendingCount + 1,
    "pending",
    newTodos[todoKey],
    todoKey
  );
  pendingTodoList.appendChild(todoCard);
  parseViews();
}

function removeOnClickHandler(todoKey) {
  const todos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY));
  todos[todoKey].done = false;
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  const todoCard = document.getElementById(`todo-card-${todoKey}`);
  todoCard.remove();

  const todoType = todos[todoKey].pinned ? "pinned" : "pending";
  const todoList = document.getElementById(`${todoType}-todo-view`);
  const label = todoList.children.length + 1;
  const pendingCard = TodoCard(label, todoType, todos[todoKey], todoKey);
  todoList.appendChild(pendingCard);
  parseViews();
}

function deleteOnClickHandler(todoKey) {
  const currTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY));
  delete currTodos[todoKey];
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(currTodos));
  parseViews();
}

export default function ControlButtons(todoType, todoKey) {
  const end = document.createElement("div");
  end.className = "navigation-buttons";
  if (todoType === "pending") {
    const editButton = createButton("Edit", "success-button");
    editButton.id = `edit-todo-${todoKey}`;
    editButton.addEventListener("click", () => editOnClickHandler(todoKey));
    end.appendChild(editButton);

    const pinButton = createButton("Pin", "success-button");
    pinButton.id = `pin-todo-${todoKey}`;
    pinButton.addEventListener("click", () => pinOnClickHandler(todoKey));
    end.appendChild(pinButton);
  } else if (todoType === "pinned") {
    const unpinButton = createButton("Unpin", "success-button");
    unpinButton.id = `unpin-todo-${todoKey}`;
    unpinButton.addEventListener("click", () => unpinOnClickHandler(todoKey));
    end.appendChild(unpinButton);
  } else if (todoType === "done") {
    const removeButton = createButton("Remove", "success-button");
    removeButton.id = `remove-todo-${todoKey}`;
    removeButton.addEventListener("click", () => removeOnClickHandler(todoKey));
    end.appendChild(removeButton);
  }

  const deleteButton = createButton("Delete", "danger-button");
  deleteButton.addEventListener("click", () => deleteOnClickHandler(todoKey));
  end.appendChild(deleteButton);

  return end;
}
