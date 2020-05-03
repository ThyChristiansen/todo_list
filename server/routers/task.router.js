const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

//GET Route
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks" ORDER BY "id" ASC;` //go to database, execute query and send back the rows
    pool.query(queryText)
        .then((result) => {
            // send back our query rows results as an array of objects
            res.send(result.rows);// result.rows will always be an Array
        }).catch(error => {
            console.log('Error in getting task', error);
            res.sendStatus(500);// 500 means "server error"
        })
})

//POST Route
router.post('/', (req, res) => { // using POST to add new task
    let newTask = req.body; // create new variable called newTask and assign it to req.body
    console.log('Adding new task:', newTask);
    let queryText = `INSERT INTO "tasks" ("taskToDo") VALUES ($1);` //go to database, execute query and send back the status
    let values = [newTask.taskToDo] // assign an array taskTodo to an variable named values

    pool.query(queryText, values)
        .then((result) => {  // if add is successfully, send the status "created"
            console.log(result);
            res.sendStatus(201);
            // 201 means "created"
        })
        .catch((error) => {
            console.log("Error from post router", error)
            res.sendStatus(500);
        })

})

//DELETE Route
// Request must include a parameter indicating what task to update - the id
router.delete('/:id', (req, res) => { // Removes the task 
    let id = req.params.id; //id of the task to delete
    console.log('Delete route called with id of', id);
    console.log('in req.body', req.body);
    let queryText = `DELETE FROM tasks WHERE id=$1;` //Go to database, delete the item have id equal $1
    pool.query(queryText, [id])
    .then((response) => {
        console.log(response);
        res.sendStatus(200); // if delete successfully, send the status OK
    }).catch((error) => {
        console.log('Error in delete router', error);
    })
})

//PIT Route
router.put('/:id', (req, res) => { //using PUT to update when status when completed
    let task = req.body;
    let id = req.params.id; 
    console.log(`Updating task ${id} with `, id);
    let currentStatus = req.params.status; 

    const queryText = `UPDATE "tasks" SET "status" = NOT $2 WHERE id=$1;` // go to data base, update the status is not equal $2 where id equal 1
    pool.query(queryText, [id, currentStatus]) 
        .then((response) => {
            console.log('in update router', response);
            res.sendStatus(201);
        }).catch((err) => {
            console.log('Error in update router', err);
            res.sendStatus(500);
        })
});


module.exports = router;