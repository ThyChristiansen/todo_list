$(document).ready(readyNow);
function readyNow() {
    console.log("JQ");
    getItem();
    $('#addBtn').on('click', addClick);
    $('#listTask').on('click', '#deleteBtn', deleteTask);
    $('#listTask').on('click', '.checkboxTask', completeTask);

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
        <input type="checkbox" class="checkboxTask" data-id = ${task.id}">       
        ${task.taskToDo}
        <button id = "deleteBtn" class = "btn taskOutBtn btn-danger" data-id = ${task.id}>Delete</button>
        <button class = " btn btn-success taskOutBtn checkboxTask" data-id = ${task.id}>Complete</button>

        </li><br />`);

    }
}

//-----------------------------------------------------

function deleteTask() {
    console.log('deleteTask clicked');
    let taskId = $(this).data('id');
    console.log(`in DELETE ${taskId}`, taskId);
    let confirmDelete = confirm('Are you sure want to delete this task?');
    if (confirmDelete == true) {
        txt = "You pressed OK!";
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
        txt = "You pressed Cancel!";
    }
}

//-----------------------------------------------------

function completeTask() {
    console.log('clicked checkbox!');
    // let taskId = $(this).data('id');
    // console.log('in PUT book status', taskId);
    // $(this).parent().removeClass('beforeChecked');
    $(this).parent().addClass('textTask');

    // $.ajax({
    //     type: 'PUT',
    //     url: `/tasks/${taskId}`,
    // }).then((response) => {
    //     console.log(response);

    //     getItem(); //Update to DOM

    // }).catch((err) => {
    //     console.log('Error in updateBookStatus', err);
    // })
}
