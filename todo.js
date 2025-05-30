document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = "";
  });

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTask(task) {
  const li = document.createElement('li');
  li.setAttribute('data-id', task.id);
  if(task.completed) {
    li.classList.add('completed');
  }

  li.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""} id="task-${task.id}">
    <label for="task-${task.id}">${task.text}</label>
    <button class="delete-btn">Delete</button>
  `;

  const checkbox = li.querySelector("input[type='checkbox']");
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    li.classList.toggle('completed');
    saveTasks();
  });

  const deleteBtn = li.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    li.remove();
  });

  todoList.appendChild(li);
}

});
