
$(document).ready(onReady);

function onReady() {
  getAllTasks();
  $('#btn-add').on('click', function(event) {
    event.preventDefault();
    addTask();
  });
  $('#out-tasks').on('click', '.btn-completed', function () {
    const task = $(this).closest('tr').data('task');
    completeTask(task);
  });
  $('#out-tasks').on('click', '.btn-delete', function () {
    const id = $(this).closest('tr').data('task').id;
    deleteTask(id);
  });
}

function getAllTasks() {
  $.ajax({
    method: 'GET',
    url: '/task'
  })
    .then( function(response) {
      console.log('Got the stuff', response);
      $('#out-tasks').empty();
      for (let task of response) {
        const $row = makeRowFor(task);
        $('#out-tasks').append($row);
      }
    })
    .catch( function(error) {
      console.log('Error getting all tasks', error);
    })
}

function makeRowFor(task) {
  let $row = $(`<tr><td>${task.name}</td></tr>`);
  $row.data('task', task);
  if ( task.completed ) {
    $row.append(`<td>Completed</td>`);
    $row.addClass('completed');
  } else {
    $row.append(`<td><button class="btn-completed">Complete Task</button></td>`);
  }
  $row.append(`<td><button class="btn-delete">Delete Task</button></td>`);
  return $row;
}

function completeTask(task) {
  $.ajax({
    method: 'PUT',
    url: `/task/complete/${task.id}`,
    data: {
      task : task
    }
  })
    .then( function(response) {
      getAllTasks();
    })
    .catch( function(error) {
      console.log(`Error completing task ${taskId}`, error);
    })
}

function deleteTask(taskId) {
  $.ajax({
    method: 'DELETE',
    url: `/task/${taskId}`
  })
    .then( function(response) {
      getAllTasks();
    })
    .catch( function(error) {
      console.log(`Error deleting task ${taskId}`, error);
    })
}

function addTask() {
  const taskName = $('#in-name').val();
  $.ajax({
    method: 'POST',
    url: `/task`,
    data: {
      name: taskName
    }
  })
    .then( function(response) {
      getAllTasks();
      $('#in-name').val('');
    })
    .catch( function(error) {
      console.log(`Error adding task`, error);
    })
}
