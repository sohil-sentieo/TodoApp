import { createButton, formatDateToCustomFormat } from "../utils.js";
import { TODO_STORAGE_KEY } from "../config.js";

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
}

function TodoEndButtons(todoType, todoKey) {
  const end = document.createElement("div");
  if (todoType === "pending") {
    const editButton = createButton("Edit", "button-secondary");
    editButton.id = `edit-todo-${todoKey}`;
    const pinButton = createButton("Pin", "button-secondary");
    pinButton.id = `pin-todo-${todoKey}`;
    pinButton.addEventListener("click", () => pinOnClickHandler(todoKey));
    end.appendChild(editButton);
    end.appendChild(pinButton);
  } else if (todoType === "pinned") {
    const unpinButton = createButton("Unpin", "button-secondary");
    unpinButton.id = `unpin-todo-${todoKey}`;
    unpinButton.addEventListener("click", () => unpinOnClickHandler(todoKey));
    end.appendChild(unpinButton);
  } else if (todoType === "done") {
    const removeButton = createButton("Remove", "button-secondary");
    removeButton.id = `remove-todo-${todoKey}`;
    removeButton.addEventListener("click", () => removeOnClickHandler(todoKey));
    end.appendChild(removeButton);
  }

  return end;
}

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
}

function TodoHeader(label, todoType, isChecked, todoKey) {
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
  const end = TodoEndButtons(todoType, todoKey);
  todoHeader.appendChild(end);

  return todoHeader;
}

function TodoContent(content, todoType) {
  const todoContent = document.createElement("div");
  todoContent.className = "todo-content";
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

function TodoCard(label, todoType, todo, todoKey) {
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo-card";
  todoContainer.id = `todo-card-${todoKey}`;

  // todo Headers >> label, checkbox, edit, pin
  const todoHeader = TodoHeader(label, todoType, todo.done, todoKey);
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

  const keys = Object.keys(todos);
  let count = 1;
  for (let i = 0; i < keys.length; i++) {
    const todoKey = keys[i];
    // if (!filterTodoMap[todoType](todos[todoKey])) {
    //   continue;
    // }
    const todoContainer = TodoCard(count++, todoType, todos[todoKey], todoKey);
    todoList.appendChild(todoContainer);
  }
  return todoList;
}

export { TodoCard };
