const toggleButton = document.getElementById("Themes");
const body = document.body;
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
}
toggleButton.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  localStorage.setItem(
    "theme",
    body.classList.contains("light-mode") ? "light" : "dark"
  );
});

const InputBox = document.getElementById("input-box");
const ListContainer = document.getElementById("list-container");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", () => {
  tasks.forEach((task) => renderTask(task));
});

function AddTask() {
  const taskText = InputBox.value.trim();
  if (!taskText) return alert("You must write something...");
  const newTask = { id: Date.now(), text: taskText, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTask(newTask);
  InputBox.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  if (task.completed) li.classList.add("checked");
  li.innerHTML = `<span>${task.text}</span>
                            <button class="icon-btn edit"><i class="fas fa-edit"></i></button>
                            <button class="icon-btn delete"><i class="fas fa-trash"></i></button>`;
  li.querySelector(".edit").addEventListener("click", () => {
    const span = li.querySelector("span");
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.text;
    input.addEventListener("blur", () => {
      task.text = input.value;
      span.textContent = task.text;
      saveTasks();
      li.replaceChild(span, input);
    });
    li.replaceChild(input, span);
    input.focus();
  });
  ListContainer.appendChild(li);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAll() {
  tasks = [];
  ListContainer.innerHTML = "";
  saveTasks();
}
li.querySelector(".delete").addEventListener("click", () => {
  tasks = tasks.filter((t) => t.id !== task.id); // Remove from array
  li.remove(); // Remove from UI
  saveTasks(); // Update localStorage
});