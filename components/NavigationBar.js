import { createButton, createInput } from "../utils.js";

function finishOnClickHandler() {
  const currTodos = JSON.parse(localStorage.getItem("todos"));
  const newTodos = currTodos.map((todo) => [...todo, ...{ done: true }]);
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
  div.appendChild(searchButton);

  // reset view button
  const resetButton = createButton("Reset", "button-inline");
  div.appendChild(resetButton);

  // all done button
  const finishButton = createButton("Mark all as done", "button");
  div.appendChild(finishButton);
  finishButton.addEventListener("click", finishOnClickHandler);

  return div;
}
