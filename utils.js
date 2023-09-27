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
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const customFormat = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return customFormat;
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
const filterMap = {
  pending: (items) => items.filter((item) => !item.done),
  pinned: (items) => items.filter((item) => item.pinned),
  done: (items) => items.filter((item) => item.done),
};

const todoContainerHeaderMap = {
  pinned: "Pinned Items",
  done: "Done",
};

export {
  createButton,
  createInput,
  TODOS,
  formatDateToCustomFormat,
  filterMap,
  todoContainerHeaderMap,
};
