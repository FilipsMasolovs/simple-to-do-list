const openTasks = document.getElementById('openTasks');
const doneTasks = document.getElementById('completedTasks');
const input = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');

let data = window.localStorage.toDoData

if (data) {
    data = JSON.parse(data)
} else {
    data = { toDoTasks: [], doneTasks: [] };
    window.localStorage.setItem('toDoData', JSON.stringify(data))
}

data.toDoTasks.forEach(function(item) {
    addToDo(item.value, openTasks, false, true, item.id)
})
data.doneTasks.forEach(function(item) {
    addToDo(item.value, doneTasks, true, true, item.id)
})

function addToDo(inputValue, container, isChecked, doNotPushToData, id) {
    let checkedAttribute = ''
    if (isChecked) {
        checkedAttribute = 'checked="true"'
    }

    const item = `<div class="task" id="${id}">
                    <div class="task-value">
                        <input type="checkbox" class="checkbox" ${checkedAttribute}>${inputValue}
                    </div>
                    <div class="task-delete">
                        <button class="delete-button">Delete</button>
                    </div>
                </div>`;
    const position = 'afterbegin';

    container.insertAdjacentHTML(position, item);

    addEventListenerToDeleteButtons();
    addEventListenerCompleteToDos();

    if (!doNotPushToData) {
        data.toDoTasks.push({
            value: inputValue,
            id: id
        })

        window.localStorage.setItem('toDoData', JSON.stringify(data))
    }
}

addTaskButton.addEventListener('click', handleAddClick);
document.addEventListener("keyup", function() {
    if (event.keyCode == 13) {
        handleAddClick()
    }
})

function handleAddClick() {
    const inputValue = input.value;
    if (inputValue) {
        let id = Date.now()
        addToDo(inputValue, openTasks, false, false, id.toString());
    }
    input.value = '';
}

function addEventListenerToDeleteButtons() {
    const deleteTaskButtons = document.querySelectorAll('.delete-button');
    let currentButton;
    for (currentButton = 0; currentButton < deleteTaskButtons.length; currentButton++) {
        const deleteButton = deleteTaskButtons[currentButton];
        deleteButton.addEventListener('click', removeToDo);
    }
}

function removeToDo(event) {
    const deleteButton = event.currentTarget;
    const id = deleteButton.closest('.task').id;
    const checked = deleteButton.closest('.task').querySelector('.checkbox').checked;

    const taskToDelete = deleteButton.closest('.task');
    taskToDelete.parentNode.removeChild(taskToDelete);

    if (checked) {
        let index = data.doneTasks.findIndex(item => item.id === id);
        data.doneTasks.splice(index, 1);
    } else {
        let index = data.toDoTasks.findIndex(item => item.id === id);
        data.toDoTasks.splice(index, 1);
    }

    window.localStorage.setItem('toDoData', JSON.stringify(data))
}

function handleCompleteToDo(event) {
    const completeToDo = event.currentTarget;
    const id = completeToDo.closest('.task').id;
    const taskValue = completeToDo.closest('.task-value').innerText;
    if (completeToDo.checked) {
        addToDo(taskValue, doneTasks, true, true, id);
        let index = data.toDoTasks.findIndex(item => item.id === id);
        let item = data.toDoTasks[index];
        data.doneTasks.push(item);
        data.toDoTasks.splice(index, 1);
    } else {
        addToDo(taskValue, openTasks, false, true, id);
        let index = data.doneTasks.findIndex(item => item.id === id);
        let item = data.doneTasks[index];
        data.toDoTasks.push(item);
        data.doneTasks.splice(index, 1);
    }

    const taskToDelete = completeToDo.closest('.task');
    taskToDelete.parentNode.removeChild(taskToDelete);

    window.localStorage.setItem('toDoData', JSON.stringify(data))
}

function addEventListenerCompleteToDos() {
    const completeToDos = document.querySelectorAll('.checkbox');
    let currentButton;
    for (currentButton = 0; currentButton < completeToDos.length; currentButton++) {
        const completeToDo = completeToDos[currentButton];
        completeToDo.addEventListener('click', handleCompleteToDo);
    }
}

addEventListenerToDeleteButtons();
addEventListenerCompleteToDos();