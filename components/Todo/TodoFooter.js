import { formatDateToCustomFormat } from "../../utils.js";

export default function TodoFooter(createdAt) {
  const todoFooter = document.createElement("div");
  todoFooter.className = "todo-footer";

  // todo dates
  const todoDates = document.createElement("div");
  todoDates.className = "todo-date";
  todoDates.innerText = "Modified : " + formatDateToCustomFormat(createdAt);
  todoFooter.appendChild(todoDates);
  return todoFooter;
}
