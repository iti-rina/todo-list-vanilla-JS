const LOCAL_STORAGE_TASK_KEY = "tasks";

const input = document.querySelector(".add-new-task-field__input-line");
let ul = document.querySelector(".task-list");
let form = document.querySelector("form");

let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

function createTask(name) {
    let task = {
        id: Date.now(),
        name: name,
        complete: false,
    }
    tasks.push(task);
    renderToDoList();
}

function renderToDoList() {
    clearToDoList(ul);
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.classList.add("task-list__li");

        let span = document.createElement("span");
        span.innerText = task.name;
        span.classList.add("task-list__task-text");

        let label = document.createElement("label");
        label.classList.add("task-list__task-checkbox");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = task.id;
        label.appendChild(checkbox);
        let checkMark = document.createElement("span");
        checkMark.classList.add("checkmark");
        label.appendChild(checkMark);

        if (task.complete === true) {
            checkbox.setAttribute("checked", "checked");
            span.style.textDecoration = "line-through";
        } else {
            span.style.textDecoration = "none";
        }


        // let checkbox = document.createElement("input");
        // checkbox.type = "checkbox";
        // checkbox.classList.add("task-list__task-checkbox");
        // checkbox.id = task.id;
        // if (task.complete === true) {
        //     checkbox.setAttribute("checked", "checked");
        //     span.style.textDecoration = "line-through";
        // } else {
        //     span.style.textDecoration = "none";
        // }

        let delSpan = document.createElement("span");
        delSpan.classList.add("task-list__delete-task");

        li.appendChild(delSpan);
        // li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(span);

        ul.appendChild(li);

    });
    save();
}


form.addEventListener("submit",(event) => {
    event.preventDefault();
    if (input.value == null || input.value === "") {
        input.placeholder = "Write something";
        return;
    } else {
        createTask(input.value);
        input.value = null;
        input.placeholder = "Add new task"
    }
    save();
    renderToDoList();
});

function clearToDoList(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

ul.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "input") {
        let selectedTask = tasks.find(task => task.id.toString() == e.target.id);
        selectedTask.complete = e.target.checked;
        save();
        renderToDoList()
    }

    if (e.target.className.toLowerCase() === "task-list__delete-task") {
        let selectedTask = tasks.find(task => task.name === e.target.parentElement.querySelector(".task-list__task-text").textContent);
        console.log(selectedTask);
        deleteTask(selectedTask);
        save();
        renderToDoList();
    }
});

function deleteTask(item) {
    let index = tasks.indexOf(item);
    tasks.splice(index, 1);
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasks));
}

renderToDoList();