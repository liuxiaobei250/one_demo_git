const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const countSpan = document.getElementById("todo-count");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

let todos = [];
let currentFilter = "all";

function updateCount() {
  const activeCount = todos.filter((t) => !t.completed).length;
  countSpan.textContent = `${activeCount} 个任务未完成`;
}

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  if (todo.completed) li.classList.add("completed");
  li.dataset.id = todo.id;

  const checkbox = document.createElement("button");
  checkbox.className = "checkbox";
  if (todo.completed) checkbox.classList.add("checked");
  checkbox.addEventListener("click", () => toggleTodo(todo.id));

  const text = document.createElement("div");
  text.className = "todo-text";
  text.textContent = todo.text;

  const actions = document.createElement("div");
  actions.className = "todo-actions";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn delete";
  deleteBtn.title = "删除";
  deleteBtn.textContent = "✕";
  deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

  actions.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(actions);

  return li;
}

function render() {
  list.innerHTML = "";
  let visible = todos;
  if (currentFilter === "active") {
    visible = todos.filter((t) => !t.completed);
  } else if (currentFilter === "completed") {
    visible = todos.filter((t) => t.completed);
  }

  visible.forEach((todo) => {
    list.appendChild(createTodoElement(todo));
  });

  updateCount();
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.unshift({
    id: Date.now().toString(),
    text,
    completed: false,
  });

  input.value = "";
  render();
}

function toggleTodo(id) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t,
  );
  render();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  render();
}

function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  render();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

clearCompletedBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

render();
