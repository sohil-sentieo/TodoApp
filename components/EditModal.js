import { TODO_STORAGE_KEY, EDITING_TODO_KEY } from "../config.js";
import { parseViews } from "../utils.js";

function cancelModalHandler() {
  const modal = document.getElementById("todo-edit-modal");
  modal.classList.add("hidden");

  const overlay = document.querySelector(".overlay");
  overlay.classList.add("hidden");

  localStorage.setItem(EDITING_TODO_KEY, "");
}

function saveModalHandler() {
  const modal = document.getElementById("todo-edit-modal");
  const editor = window.editor;
  const data = editor.getData();

  const todoKey = localStorage.getItem(EDITING_TODO_KEY);
  localStorage.setItem(EDITING_TODO_KEY, "");

  const todos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY));
  todos[todoKey].text = data;
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  parseViews();
  modal.classList.add("hidden");
  editor.setData("");

  const overlay = document.querySelector(".overlay");
  overlay.classList.add("hidden");
}

export default function EditModal() {
  const modal = document.createElement("section");
  modal.className = "modal";
  modal.classList.add("hidden");
  modal.id = "todo-edit-modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal__content";
  modal.appendChild(modalContent);

  const modalInput = document.createElement("input");
  modalInput.id = "todo-modal-input";
  modalContent.appendChild(modalInput);

  const buttonDiv = document.createElement("div");
  modal.appendChild(buttonDiv);

  const modalSubmitButton = document.createElement("button");
  modalSubmitButton.className = "button";
  modalSubmitButton.innerText = "Save";
  modalSubmitButton.addEventListener("click", saveModalHandler);
  buttonDiv.appendChild(modalSubmitButton);

  const modalCancelButton = document.createElement("button");
  modalCancelButton.className = "button-danger";
  modalCancelButton.innerText = "Cancel";
  modalCancelButton.addEventListener("click", cancelModalHandler);
  buttonDiv.appendChild(modalCancelButton);

  return modal;
}
