import { createButton, formatDateToCustomFormat } from "../utils.js";

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

function TodoHeader(label, isChecked, todoType) {
  const todoHeader = document.createElement("div");
  todoHeader.className = "todo-header";

  const start = document.createElement("div");
  const todoLabel = document.createElement("span");
  todoLabel.innerText = label;
  start.appendChild(todoLabel);

  //checkbox
  const todoChecked = document.createElement("input");
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

export default function ViewTodo(todoType, todos) {
  const todoList = document.createElement("div");
  todoList.className = "todo-list";

  for (let i = 0; i < todos.length; i++) {
    // div label
    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-container";

    // todo Headers >> label, checkbox, edit, pin
    const todoHeader = TodoHeader(i + 1, todos[i].done, todoType);
    todoContainer.appendChild(todoHeader);

    // todo content
    const todoContent = TodoContent(todos[i].text, todoType);
    todoContainer.appendChild(todoContent);

    // todo footer
    const todoFooter = TodoFooter(todos[i].created_at);
    todoContainer.appendChild(todoFooter);

    todoList.appendChild(todoContainer);
  }
  return todoList;
}
