

$(document).ready(readyNow);
function readyNow() {
    console.log("JQ");
    getItem();
    $('#addBtn').on('click', addClick);
    $('#listTask').on('click', '#deleteBtn', deleteTask);
    $('#listTask').on('click', '.checkCompleted', completeTask);
    $('.btn').mouseenter(buttonMouseEnter);
    $('.btn').mouseleave(buttonMouseLeave);
    $('#inputTask').mouseenter(inputTaskEnter);
    $('#inputTask').mouseleave(inputTaskLeave);
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
        $('#inputTask').val('');
        getItem();


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
        el.append(`<li id = "text" class = "beforeCheck" > 
        <input type="checkbox" class="checkboxTask checkCompleted" data-id = ${task.id}">
        <spand>${task.taskToDo}</spand>
        <button id = "deleteBtn" class = "btn btn-danger taskOutBtn" data-id = ${task.id}>Delete</button>
        <button id = "completeBtn" class = "btn btn-success taskOutBtn checkCompleted" data-id = ${task.id}>Completed</button>
        </li><br />`);
        $(this).addClass("w3-center w3-animate-top")
    }
}

//-----------------------------------------------------

function deleteTask() {
    console.log('deleteTask clicked');
    let taskId = $(this).data('id');
    console.log(`in DELETE ${taskId}`, taskId);
    // let confirmDelete = confirm('Are you sure want to delete this task?');
    // if (confirmDelete == true) {
    // } else {
    //     return false;
    // }


    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your task has been deleted!", {
                    icon: "success",
                });
                $.ajax({
                    type: 'DELETE',
                    url: `/tasks/${taskId}`,
                }).then((response) => {
                    console.log(response);
                    getItem();
                    $(this).parent().fadeOut(10000);
                    $(this).parent().slideUp(20000);
                }).catch((error) => {
                    console.log('Error in delete task', error);
                })
            } else {
                swal("Your task is safe!");
            }
        });
}

//-----------------------------------------------------

function completeTask() {
    console.log('clicked!');
    let taskId = $(this).data('id');
    console.log('in PUT tasks status', taskId);
    $(this).parent().addClass('textTask');

    $(this).parent().fadeOut(1000);
    $(this).parent().slideUp(1000); //this one I made just for fun

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

function buttonMouseEnter() {
    $(this).css({ 'border': '2px solid gray', 'box-shadow': '1px 1px 3px gray', 'text-decoration': 'underline' });
}
function buttonMouseLeave() {
    $(this).css({ 'border': '0px solid white', 'text-decoration': 'none' });
}
function inputTaskEnter() {
    $(this).css({ 'border': '1px solid gray', 'box-shadow': '1px 2px 4px gray' });
}
function inputTaskLeave() {
    $(this).css({ 'border': '1px solid black' });
}