
$(document).ready(readyNow);//Hey Jquery, run the readyNow function when you ready.
function readyNow() {
    console.log("JQ");
    getItem();//append to DOM the tasks right after add them.
    $('#addBtn').on('click', addClick); // when add button pressed, it will run addClick function
    $('#listTask').on('click', '#deleteBtn', deleteTask);// when the delete button on table list tasks is pressed, it will run the deleteTask function
    $('#listTask').on('click', '.checkCompleted', completeTask);// when the complete button on table list tasks is pressed, it will run the completeTask function
    //add some visual when we move the mouse over the input field and buttons
    $('.btn').mouseenter(buttonMouseEnter);
    $('.btn').mouseleave(buttonMouseLeave);
    $('#inputTask').mouseenter(inputTaskEnter);
    $('#inputTask').mouseleave(inputTaskLeave);
}

function addClick() { // this function use to add new tasks to server via AJAX
    console.log('addBtn clicked!');
    let taskToSend = {
        taskToDo: $('#inputTask').val(), // send to server the value we have in input field
    }
    console.log("in task to send", taskToSend);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToSend //send the task which is we created above
    }).then((response) => {
        console.log('Back from POST', response);
        $('#inputTask').val(''); // emptying the input field when we send data successfully
        getItem();// refest DOM after post new task
    }).catch((error) => { //if we send the data is not successful, it will notification error in POST
        console.log('Error in POST', error);
    })
}

function getItem() { //make an AJAX request  
    console.log('in getItem');
    $.ajax({
        type: 'GET',
        url: '/tasks',
    }).then((response) => {
        console.log('from GET', response);
        renderToDOM(response); // call rederToDOM function here to append each tasks to table in DOM
    }).catch((err) => {
        console.log('Error in GET', err);
    })
}

function renderToDOM(tasksArray, derection) {

    let el = $('#listTask');
    el.empty();
    for (let i = 0; i < tasksArray.length; i++) {
        let task = tasksArray[i];
        let row = $(`<tr id = "text" class = "beforeCheck"><td>${task.taskToDo}</td></tr>`)
        if (task.status) { //condition for complete button
            // row.append(`<td><input type="checkbox" class="checkboxTask checkCompleted" data-id = ${task.id}"></td>`)
            row.append(`<td><button id = "completeBtn" class = "btn btn-success taskOutBtn checkCompleted" data-id = ${task.id}>Completed</button></td>`)
        } else {
            // row.append(`<td>Completed</td>`);
            row.addClass('textTask');
            row.append(`<td class = "checkCompleted" >Complete</td>`);
        }
        el.append(row);
        row.append(`<td><button id = "deleteBtn" class = "btn btn-danger taskOutBtn" data-id = ${task.id}>Delete</button></td>`)
    }
}

//-----------------------------------------------------

function deleteTask() { //send the delete request to delete the tasks by ID
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

                }).catch((error) => {
                    console.log('Error in delete task', error);
                })
            } else {
                swal("Your task is safe!");
            }
        });
}

//-----------------------------------------------------

function completeTask() { //update the DOM everytime we press the complete button
    console.log('clicked!');
    let taskId = $(this).data('id');
    console.log('in PUT tasks status', taskId);
    // $(this).parent().fadeOut(1000);
    // $(this).parent().slideUp(1000); //this one I made just for fun

    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`,
    }).then((response) => {
        console.log(response);
        getItem();//refrest the DOM after click complete button

    }).catch((err) => {
        console.log('Error in completeTask', err);
    })
}

//add some visual when we move the mouse over the input field and buttons
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
