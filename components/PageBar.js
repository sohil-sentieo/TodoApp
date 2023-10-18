import { PAGE_SIZES, PAGE_KEYS } from "../config.js";
import { getTodoTypeCurrentPage, parseViews } from "../utils.js";

function handleInputOnChange(todoType, totalPage, event) {
  const input = document.getElementById(`${todoType}-page-input`);
  const inputPage = event.target.value;
  if (inputPage <= 0 || inputPage > totalPage) {
    input.classList.add("input-error");
    return;
  }

  localStorage.setItem(PAGE_KEYS[todoType], inputPage);
  input.classList.remove("input-error");
  parseViews();
}

function nextPageClickHandler(todoType, totalPage) {
  const pageInput = document.getElementById(`${todoType}-page-input`);
  const nextPage = parseInt(pageInput.value) + 1;
  if (nextPage > totalPage) {
    return;
  }
  localStorage.setItem(PAGE_KEYS[todoType], nextPage);
  parseViews();
}

function previousPageClickHandler(todoType, totalPage) {
  const pageInput = document.getElementById(`${todoType}-page-input`);
  const prevPage = parseInt(pageInput.value) - 1;
  if (prevPage < 1) {
    return;
  }
  localStorage.setItem(PAGE_KEYS[todoType], prevPage);
  parseViews();
}

export default function PageBar(todoType, todos) {
  const pageBar = document.createElement("div");
  pageBar.className = "todo-page-bar";

  // text with total page
  const totalDescription = document.createElement("span");
  const pageSize = PAGE_SIZES[todoType];
  const totalPage = Math.ceil(Object.keys(todos).length / pageSize);
  totalDescription.innerText = `of ${totalPage ? totalPage : 1}`;

  // button to go left
  const leftButton = document.createElement("button");
  leftButton.innerText = "<";
  leftButton.addEventListener("click", () =>
    previousPageClickHandler(todoType, totalPage)
  );

  // inner for page number
  const input = document.createElement("input");
  input.id = `${todoType}-page-input`;
  input.value = getTodoTypeCurrentPage(todoType);
  input.addEventListener("change", (event) =>
    handleInputOnChange(todoType, totalPage, event)
  );

  // button to go right
  const rightButton = document.createElement("button");
  rightButton.innerText = ">";
  rightButton.addEventListener("click", () =>
    nextPageClickHandler(todoType, totalPage)
  );

  pageBar.appendChild(leftButton);
  pageBar.appendChild(input);
  pageBar.appendChild(totalDescription);
  pageBar.appendChild(rightButton);

  return pageBar;
}
