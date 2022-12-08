const newTaskInput = document.querySelector("#new-task");
const addBtn = document.querySelector("#add");
const newTasksDiv = document.querySelector(".new-tasks");

newTaskInput.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!newTaskInput.value) return;
    createTask(newTaskInput.value);
  }
});

addBtn.addEventListener("click", function (e) {
  if (!newTaskInput.value) return;
  createTask(newTaskInput.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("erase-btn")) {
    el.parentElement.remove();
    saveTasks();
  }
});

// Erases input after the task is sent
const eraseInput = () => {
  newTaskInput.value = "";
  newTaskInput.focus();
};

// Creating DOM elements such as li, p and button
const createTaskLi = () => {
  const li = document.createElement("li");
  li.classList.add("new-task");
  newTasksDiv.appendChild(li);
  return li;
};

const createTaskText = () => {
  const p = document.createElement("p");
  return p;
};

const createEraseButton = (li) => {
  const eraseBtn = document.createElement("button");
  eraseBtn.innerText = "Erase";
  eraseBtn.classList.add("erase-btn");
  li.appendChild(eraseBtn);
};

// Function that creates each task
const createTask = (inputText) => {
  const li = createTaskLi();
  const p = createTaskText()
  p.innerText = inputText
  li.appendChild(p)
  createEraseButton(li);
  eraseInput();
  saveTasks();
};

// Function that saves all tasks in case window is closed
// JSON and localStorage

const saveTasks = () => {
  const allLis = newTasksDiv.querySelectorAll("li");
  const taskList = [];

  for (let task of allLis) {
    let taskText = task.innerText;
    taskText = taskText.replace('Erase', '').trim()
    taskList.push(taskText)    
  }
  const tasksJSON = JSON.stringify(taskList);
  localStorage.setItem('tasks', tasksJSON)
};

const addSavedTasks = () => {
  const tasks = localStorage.getItem('tasks')
  const tasksList = JSON.parse(tasks)
  console.log(tasksList);

  for(let task of tasksList){
    createTask(task)
  }
}
addSavedTasks()
