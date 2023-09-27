import { createButton, formatDateToCustomFormat } from "../utils.js";
import parseTodoView from "./TodoList.js";

function TodoEndButtons(type) {
  const end = document.createElement("div");
  if (type === "pending") {
    const editButton = createButton("Edit", "button-secondary");
    const pinButton = createButton("Pin", "button-secondary");
    end.appendChild(editButton);
    end.appendChild(pinButton);
  } else if (type === "pinned") {
    const unpinButton = createButton("Unpin", "button-secondary");
    end.appendChild(unpinButton);
  } else if (type === "done") {
    const removeButton = createButton("Remove", "button-secondary");
    end.appendChild(removeButton);
  }

  return end;
}

function handleOnCheck(label, isChecked) {
  const index = label - 1;
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].done = isChecked;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function TodoHeader(label, todoType, isChecked) {
  const todoHeader = document.createElement("div");
  todoHeader.className = "todo-header";

  const start = document.createElement("div");
  const todoLabel = document.createElement("span");
  todoLabel.innerText = label;
  start.appendChild(todoLabel);

  //checkbox
  const todoChecked = document.createElement("input");
  todoChecked.addEventListener("change", () =>
    handleOnCheck(label, todoChecked.checked)
  );
  todoChecked.type = "checkbox";
  todoChecked.checked = isChecked;

  start.appendChild(todoChecked);

  todoHeader.appendChild(start);

  //edit & pin button
  const end = TodoEndButtons(todoType);
  todoHeader.appendChild(end);

  return todoHeader;
}

function TodoContent(content, todoType) {
  const todoContent = document.createElement("div");
  todoContent.className = "todo-content";
  todoContent.classList.add(todoType);
  todoContent.innerText = content;
  return todoContent;
}

function TodoFooter(createdAt) {
  const todoFooter = document.createElement("div");
  todoFooter.className = "todo-footer";

  // todo dates
  const todoDates = document.createElement("div");
  todoDates.className = "todo-date";
  todoDates.innerText = "Created: " + formatDateToCustomFormat(createdAt);
  todoFooter.appendChild(todoDates);
  return todoFooter;
}

function TodoCard(label, todoType, todo) {
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo-card";

  // todo Headers >> label, checkbox, edit, pin
  const todoHeader = TodoHeader(label, todoType, todo.done);
  todoContainer.appendChild(todoHeader);

  // todo content
  const todoContent = TodoContent(todo.text, todoType);
  todoContainer.appendChild(todoContent);

  // todo footer
  const todoFooter = TodoFooter(todo.created_at);
  todoContainer.appendChild(todoFooter);

  return todoContainer;
}

export default function ViewTodo(todoType, todos) {
  const todoList = document.createElement("div");
  todoList.className = "todo-list";
  todoList.classList.add(`${todoType}-todo-list`);
  todoList.id = `${todoType}-todo-view`;

  for (let i = 0; i < todos.length; i++) {
    const todoContainer = TodoCard(i + 1, todoType, todos[i]);
    todoList.appendChild(todoContainer);
  }
  return todoList;
}

export { TodoCard };
