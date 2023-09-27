import { todoContainerHeaderMap, filterMap } from "../utils.js";
import ViewTodo from "./Todo.js";

export default function TodoList(todoType, todos) {
  const todoContainer = document.createElement("div");
  if (todoType !== "pending") {
    const containerHeader = document.createElement("h2");
    containerHeader.innerText = todoContainerHeaderMap[todoType];
    todoContainer.appendChild(containerHeader);
  }
  const filteredTodos = filterMap[todoType](todos);
  const todosView = ViewTodo(todoType, filteredTodos);
  todoContainer.appendChild(todosView);

  return todoContainer;
}
