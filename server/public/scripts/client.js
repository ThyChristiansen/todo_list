
$(document).ready(readyNow);//Hey Jquery, run the readyNow function when you ready.
function readyNow() {
    console.log("JQ");
    getItem();//append to DOM the tasks right after add them.
    $('#addBtn').on('click', addClick); // when add button pressed, it will run addClick function
    $('#listTask').on('click', '#deleteBtn', deleteTask);// when the delete button on table list tasks is pressed, it will run the deleteTask function
    $('#listTask').on('click', '.checkCompleted', completeTask);// when the complete button on table list tasks is pressed, it will run the completeTask function
    // $('#listTask').on('click', '.checkCompleted', completeTask);// when the complete button on table list tasks is pressed, it will run the completeTask function

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

function renderToDOM(tasksArray) {

    let el = $('#listTask');
    el.empty();
    for (let i = 0; i < tasksArray.length; i++) {
        let task = tasksArray[i];
        let row = $(`<tr class = "beforeCheck"></tr>`)
        if (task.status) { //condition for complete checkbox
            row.append(`<td><input type="checkbox" id ="checkbox" class="btnInTask checkCompleted" data-id = ${task.id}></td>`)
        } else {
            //add class to change backgroud color and add line-though in text of task
            row.addClass('textTask');
            //check icon
            row.append(`<td><svg class="bi bi-check" id = "completeBtn" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
          </svg></td>`);
        }
        row.append(`<td class = "text">${task.taskToDo}</td>`)
        el.append(row); //append tasks

        //delete icon
        row.append(`<td><svg class="bi bi-trash-fill" id = "deleteBtn" data-id = ${task.id} width="1em" height="1em" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>
      </svg></td>`)
    }
}

//-----------------------------------------------------

function deleteTask() { //send the delete request to delete the tasks by ID
    console.log('deleteTask clicked');
    let taskId = $(this).data('id');
    console.log(`in DELETE ${taskId}`, taskId);
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
