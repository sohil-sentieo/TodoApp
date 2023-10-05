export default function TodoContent(content, todoType) {
  const todoContent = document.createElement("div");
  todoContent.className = "todo-content";
  todoContent.innerHTML = content;
  return todoContent;
}
