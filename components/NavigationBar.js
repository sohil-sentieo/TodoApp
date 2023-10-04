import { createButton, createInput, parseViews } from "../utils.js";
import { TODO_STORAGE_KEY } from "../config.js";

function finishOnClickHandler() {
  const currTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY));
  const newTodos = {};
  const keys = Object.keys(currTodos);
  for (let key of keys) {
    newTodos[key] = { ...currTodos[key], done: true, pinned: false };
  }
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(newTodos));
  parseViews();
}

function searchOnClickHandler() {
  const searchInput = document.getElementById("search-todo-input");
  const searchValue = searchInput.value;
  parseViews(searchValue);
}

function resetOnClickHandler() {
  const searchInput = document.getElementById("search-todo-input");
  searchInput.value = "";
  parseViews();
}

function clearOnClickHandler() {
  localStorage.setItem(TODO_STORAGE_KEY, null);
  parseViews();
}

export default function NavigationBar() {
  const div = document.createElement("div");
  // search bar

  const searchInput = createInput(
    "text",
    "Search",
    "search-input",
    "search-todo-input"
  );
  div.appendChild(searchInput);

  // search button
  const searchButton = createButton("Search", "button-inline");
  searchButton.addEventListener("click", searchOnClickHandler);
  div.appendChild(searchButton);

  // reset view button
  const resetButton = createButton("Reset", "button-inline");
  resetButton.addEventListener("click", resetOnClickHandler);
  div.appendChild(resetButton);

  // all done button
  const finishButton = createButton("Mark all as done", "button-inline");
  div.appendChild(finishButton);
  finishButton.addEventListener("click", finishOnClickHandler);

  const clearTodos = createButton(
    "Clear all todos",
    "button-inline button-danger"
  );
  clearTodos.addEventListener("click", clearOnClickHandler);
  div.appendChild(clearTodos);

  return div;
}
