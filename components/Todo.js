import TodoHeader from "./Todo/TodoHeader.js";
import TodoFooter from "./Todo/TodoFooter.js";
import TodoContent from "./Todo/TodoContent.js";

export default function TodoCard(label, todoType, todo, todoKey) {
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
