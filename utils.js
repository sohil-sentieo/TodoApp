import ViewTodo from "./components/Todo.js";

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
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  const customFormat = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return customFormat;
}

function parseTodoView(todoType, todoContainer) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos !== null ? todos : {};

  const containerHeader = document.createElement("h2");
  containerHeader.innerText = todoContainerHeaderMap[todoType];
  todoContainer.appendChild(containerHeader);

  const todosView = ViewTodo(todoType, todos);
  todoContainer.appendChild(todosView);
}

function parseViews() {
  const todoViews = Object.keys(todoContainerHeaderMap);
  for (let todoView of todoViews) {
    const viewContainer = document.getElementById(`${todoView}-todo-container`);
    parseTodoView(todoView, viewContainer);
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

export {
  createButton,
  createInput,
  TODOS,
  formatDateToCustomFormat,
  filterTodoMap,
  todoContainerHeaderMap,
  parseTodoView,
  parseViews,
};
