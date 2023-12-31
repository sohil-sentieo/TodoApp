import PageBar from "./components/PageBar.js";
import TodoList from "./components/TodoList.js";
import { TODO_STORAGE_KEY, PAGE_KEYS, PAGE_SIZES } from "./config.js";

function createButton(text, className) {
  const button = document.createElement("button");
  button.innerText = text;
  button.className = className;
  return button;
}

function createInput(type, placeholder, className, id) {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.className = className;
  input.id = id;
  return input;
}

function formatDateToCustomFormat(date) {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear().toString().slice(-2);

  const customFormat = `${day}-${month}-${year}`;

  return customFormat;
}

function getTodos(storageKey, searchContent, todoType) {
  const todos = JSON.parse(localStorage.getItem(storageKey));
  if (!todos) {
    return {};
  }
  let filteredTodos = {};
  const keys = Object.keys(todos);
  for (let key of keys) {
    if (!filterTodoMap[todoType](todos[key])) {
      continue;
    }
    if (!searchContent) {
      filteredTodos[key] = todos[key];
      continue;
    }

    if (todos[key].text.toLowerCase().includes(searchContent.toLowerCase())) {
      filteredTodos[key] = todos[key];
    }
  }

  return filteredTodos;
}

function getPageTodos(todos, todoType) {
  let currentPageNumber = getTodoTypeCurrentPage(todoType);
  const pageSize = PAGE_SIZES[todoType];
  currentPageNumber = parseInt(currentPageNumber) - 1;
  const filteredKeys = Object.keys(todos).slice(
    currentPageNumber * pageSize,
    (currentPageNumber + 1) * pageSize
  );

  return Object.fromEntries(
    Object.entries(todos).filter(([key, value]) => filteredKeys.includes(key))
  );
}

function parseTodoView(todoType, todoContainer, searchContent) {
  todoContainer.innerHTML = "";
  const containerHeader = document.createElement("h3");
  containerHeader.innerText = todoContainerHeaderMap[todoType];
  todoContainer.appendChild(containerHeader);

  const filteredTodos = getTodos(TODO_STORAGE_KEY, searchContent, todoType);
  const currentPageTodos = getPageTodos(filteredTodos, todoType);
  const todosView = TodoList(todoType, currentPageTodos);
  todoContainer.appendChild(todosView);

  const pageScroll = PageBar(todoType, filteredTodos);
  todoContainer.appendChild(pageScroll);
}

function parseViews() {
  const searchInput = document.getElementById("search-todo-input");
  const searchContent = searchInput.value;
  const todoViews = Object.keys(todoContainerHeaderMap);
  for (let todoView of todoViews) {
    const viewContainer = document.getElementById(`${todoView}-todo-container`);
    parseTodoView(todoView, viewContainer, searchContent);
  }
}

// view pane
const CREATED_AT = new Date();
const UPDATED_AT = new Date();
const TODOS = [
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    pinned: true,
    done: false,
    created_at: CREATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    text: "qqqqq",
    pinned: false,
    done: false,
    created_at: CREATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    text: "what is this",
    pinned: false,
    done: true,
    created_at: CREATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    pinned: true,
    done: false,
    created_at: CREATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    pinned: false,
    done: true,
    created_at: CREATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    pinned: false,
    done: false,
    created_at: CREATED_AT,
    updated_at: UPDATED_AT,
  },
];
const filterTodoMap = {
  pending: (item) => !item.done && !item.pinned,
  pinned: (item) => item.pinned && !item.done,
  done: (item) => item.done,
};

const todoContainerHeaderMap = {
  pending: "Pending Items",
  pinned: "Pinned Items",
  done: "Done Items",
};

function initializeCKEditor() {
  ClassicEditor.create(document.querySelector("#todo-modal-input"))
    .then((editor) => {
      window.editor = editor;
    })
    .catch((error) => console.log(error));
}

function initializePageInput() {
  localStorage.setItem(PAGE_KEYS.pending, 1);
  localStorage.setItem(PAGE_KEYS.pinned, 1);
  localStorage.setItem(PAGE_KEYS.done, 1);
}

function bootstrap() {
  initializeCKEditor();
  initializePageInput();
}

function getTodoTypeCurrentPage(todoType) {
  return localStorage.getItem(PAGE_KEYS[todoType]);
}

export {
  createButton,
  createInput,
  TODOS,
  formatDateToCustomFormat,
  filterTodoMap,
  todoContainerHeaderMap,
  parseTodoView,
  parseViews,
  bootstrap,
  getTodoTypeCurrentPage,
};
