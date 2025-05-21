document.addEventListener("DOMContentLoaded", function () {
  let todoInput = document.getElementById("todo-input");
  let addTaskButton = document.getElementById("add-task-btn");
  let list = document.getElementById("todo-list");

  let storedTasks = localStorage.getItem("tasks");
  // let tasks = storedTasks !== "undefined" ? JSON.parse(storedTasks) : [];
  let tasks =  JSON.parse(storedTasks) || [];
  

  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", function () {
    let taskText = todoInput.value.trim();
    if (!taskText) return;

    let newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    console.log(tasks)
    renderTask(newTask);
    saveTasks(tasks);
    todoInput.value = "";
  });

  function renderTask(task) {

    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `<span>${task.text}</span>
      <button>delete</button>`;

    list.appendChild(li);

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON"){
        li.remove();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks(tasks);
      }
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks(tasks);
    });

    // li.querySelector("button").addEventListener("click", (e) => {
    //   e.stopPropagation();
    //   li.remove();
    //   tasks = tasks.filter((t) => t.id !== task.id);
    //   saveTasks(tasks);
    // });
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
