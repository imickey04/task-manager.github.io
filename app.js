// Define UI vars:-

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all Event Listeners:-
loadEventListeners();

// Creating Actual function:-
function loadEventListeners() {

    // DOM Load Event:-
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event:-
    form.addEventListener('submit', addTask);

    // Remove task event:-
    taskList.addEventListener('click', removeTask);

    // Clear task event:-
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks events:-
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from local storage when DOM has loaded:-
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {

        // Create li element:-
        const li = document.createElement('li');

        // Add a class:-
        li.className = 'collection-item';

        // Create text node 7 append to the li:-
        li.appendChild(document.createTextNode(task));

        // Create new link element:-
        const link = document.createElement('a');

        // Add a class:-
        link.className = 'delete-item secondary-content';

        // Add icon html:-
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the link to the li:-
        li.appendChild(link);

        // Append the li to the ul:-
        taskList.appendChild(li);
    });
}

// Add Task:-
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please Add A Task First');
    }

    // Create li element:-
    const li = document.createElement('li');

    // Add a class:-
    li.className = 'collection-item';

    // Create text node 7 append to the li:-
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element:-
    const link = document.createElement('a');

    // Add a class:-
    link.className = 'delete-item secondary-content';

    // Add icon html:-
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to the li:-
    li.appendChild(link);

    // Append the li to the ul:-
    taskList.appendChild(li);

    // Store in local storage:-
    storeTaskInLocalStorage(taskInput.value);

    // Clear input:-
    taskInput.value = '';

    e.preventDefault();
}

// Store Task:-
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task:-
function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {

        if (confirm('Do you really want to delete?')) {
            e.target.parentElement.parentElement.remove();

            // Remove Task from Local storage:-
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS:-
function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if (taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks:-
function clearTasks() {

    // Slower Way:
    // taskList.innerHTML = '';

    // Faster Way:
    if (taskList.innerHTML != '' && confirm('Do you really want to delete them all?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    // Clear task from LS:-
    clearTasksFromLocalStorage();

    // Speed comparing link:
    // https://www.measurethat.net/Benchmarks/Show/34/0/innerhtml-vs-removechild
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks:-
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;

            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}