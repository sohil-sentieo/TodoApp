import TodoCard from "./Todo.js";

export default function TodoList(todoType, todos) {
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
