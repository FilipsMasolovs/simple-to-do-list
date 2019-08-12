const openTasks = document.getElementById('openTasks');
const doneTasks = document.getElementById('completedTasks');
const input = document.getElementById('addTaskInput');
const addTaskButton = document.getElementById('addTaskButton');

let data = [{
        value: 'Go Shopping',
        isChecked: false,
        id: '0',
    },
    {
        value: 'Pay Bills',
        isChecked: false,
        id: '1',
    },
    {
        value: 'See the Doctor',
        isChecked: true,
        id: '2',
    }
]

data.forEach(function(item) {
    addToDo(item.value, item.isChecked ? doneTasks : openTasks, item.isChecked, true, item.id)
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
        data.push({
            value: inputValue,
            isChecked: isChecked,
            id: id
        });
    }
}

addTaskButton.addEventListener('click', handleAddClick);
document.addEventListener("keyup", function() {
    if (event.keyCode == 13) { handleAddClick() }
})

function handleAddClick() {
    const inputValue = input.value;
    if (inputValue) {
        let id = Date.now()
        addToDo(inputValue, openTasks, false, false, id.toString());
    }
    input.value = '';
}





// REMOVE TO DO!!! WORKING ON THIS





function addEventListenerToDeleteButtons() {
    const deleteTaskButtons = document.querySelectorAll('.delete-button');
    let currentButton;
    for (currentButton = 0; currentButton < deleteTaskButtons.length; currentButton++) {
        const deleteButton = deleteTaskButtons[currentButton];
        deleteButton.addEventListener('click', removeToDo);
    }
}

function removeToDo(inputValue, container, isChecked, doNotPushToData) {
    const deleteButton = event.currentTarget;
    const id = deleteButton.closest('.task').id;

    const taskToDelete = deleteButton.closest('.task');
    taskToDelete.parentNode.removeChild(taskToDelete);

    var index = data.findIndex(item => item.id === id)
    data.splice(index, 1);

    console.log(id)
    console.log(data)
}

function handleCompleteToDo(event) {
    const completeToDo = event.currentTarget;
    const taskValue = completeToDo.closest('.task-value').innerText;
    if (completeToDo.checked) {
        addToDo(taskValue, doneTasks, true);
    } else {
        addToDo(taskValue, openTasks, false);
    }
    const taskToDelete = completeToDo.closest('.task');
    taskToDelete.parentNode.removeChild(taskToDelete);
}

function addEventListenerCompleteToDos() {
    const completeToDos = document.querySelectorAll('.checkbox');
    let currentButton;
    for (currentButton = 0; currentButton < completeToDos.length; currentButton++) {
        const completeToDo = completeToDos[currentButton];
        completeToDo.addEventListener('click', handleCompleteToDo);
    }
}

addEventListenerToDeleteButtons()
addEventListenerCompleteToDos()