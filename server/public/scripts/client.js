$(document).ready(readyNow);
function readyNow() {
    console.log("JQ");
    getItem();
    $('#addBtn').on('click', addClick);
    $('#listTask').on('click', '#deleteBtn', deleteTask);
    // $('#listTask').on('click', '.checkboxTask', completeTask); give up  checkbox
    $('#listTask').on('click', '#completeBtn', completeTask);


}

function addClick() {
    console.log('addBtn clicked!');
    let taskToSend = {
        taskToDo: $('#inputTask').val(),
    }
    console.log("in task to send", taskToSend);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then((response) => {
        console.log('Back from POST', response);
        getItem();
        $('#inputTask').val('');
    }).catch((error) => {
        console.log('Error in POST', error);
    })

}

function getItem() {
    console.log('in getItem');
    $.ajax({
        type: 'GET',
        url: '/tasks',
    }).then((response) => {
        console.log('from GET', response);
        renderToDOM(response);
    }).catch((err) => {
        console.log('Error in GET', err);
    })
}

function renderToDOM(tasksArray) {
    let el = $('#listTask');
    el.empty();
    for (let i = 0; i < tasksArray.length; i++) {
        let task = tasksArray[i];
        el.append(`<li id = "text" class = "beforeCheck"> 
        ${task.taskToDo}
        <button id = "deleteBtn" class = "btn btn-danger taskOutBtn" data-id = ${task.id}>Delete</button>
        <button id = "completeBtn" class = "btn btn-success taskOutBtn" data-id = ${task.id}>Complete</button>
        </li><br />`);

    }
}
        // <input type="checkbox" class="checkboxTask" data-id = ${task.id}">   give up checkbox    

//-----------------------------------------------------

function deleteTask() {
    console.log('deleteTask clicked');
    let taskId = $(this).data('id');
    console.log(`in DELETE ${taskId}`, taskId);
    let confirmDelete = confirm('Are you sure want to delete this task?');
    if (confirmDelete == true) {
        $.ajax({
            type: 'DELETE',
            url: `/tasks/${taskId}`,
        }).then((response) => {
            console.log(response);
            getItem();
        }).catch((error) => {
            console.log('Error in delete task', error);
        })
    } else {
        return false;
    }

}

//-----------------------------------------------------

function completeTask() {
    console.log('clicked!');
    let taskId = $(this).data('id');
    console.log('in PUT tasks status', taskId);
    $(this).parent().addClass('textTask');
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`,
    }).then((response) => {
        console.log(response);
        // getItem();
        $(this).parent().addClass('textTask');
    }).catch((err) => {
        console.log('Error in completeTask', err);
    })
}
