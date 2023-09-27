import { todoContainerHeaderMap, filterTodoMap } from "../utils.js";
import ViewTodo from "./Todo.js";

export default function parseTodoView(todoType, todoContainer) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos !== null ? todos : [];

  const containerHeader = document.createElement("h2");
  containerHeader.innerText = todoContainerHeaderMap[todoType];
  todoContainer.appendChild(containerHeader);

  const filteredTodos = filterTodoMap[todoType](todos);
  const todosView = ViewTodo(todoType, filteredTodos);
  todoContainer.appendChild(todosView);
}
