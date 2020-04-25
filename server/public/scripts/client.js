$(document).ready(readyNow);
function readyNow() {
    console.log("JQ");
    getItem();
    $('#addBtn').on('click', addClick);
    $('#listTask').on('click','#deleteBtn', deleteTask);


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
    }).then((response)=>{
        console.log('Back from POST',response);
        getItem();
    }).catch((error)=>{
        console.log('Error in POST',error);
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

function renderToDOM(tasksArray){
    let el = $('#listTask');
    el.empty();
    for (let i = 0; i< tasksArray.length; i++){
        let task = tasksArray[i];
        el.append(`<li>${task.taskToDo}
        <button id = "deleteBtn" data-id = ${task.id}>Delete</button>

        </li>`);
    }
}

function deleteTask(){
    console.log('deleteTask clicked');
    let taskId = $(this).data('id');
    console.log(`in DELETE ${taskId}`,taskId);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`,
    }).then((response) => {
        console.log(response);
        getItem();
    }).catch((error) =>{
        console.log('Error in delete task',error);
    })

}

