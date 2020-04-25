$(document).ready(readyNow);
function readyNow() {
    console.log("JQ");
    refrestTask();
    $('#addBtn').on('click', addClick);

}

function addClick() {
    console.log('addBtn clicked!');

}

function refrestTask() {
    console.log('in refrestTask');
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
        el.append(`<li>${tasksArray[i].listToDo}</li>`)
    }
}
