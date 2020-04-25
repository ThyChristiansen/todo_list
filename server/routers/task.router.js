const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch(error => {
            console.log('Error in getting task', error);
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Adding new task:', newTask);

    let queryText = `INSERT INTO "tasks" ("taskToDo") VALUES ($1);`
    let values = [newTask.taskToDo]
    pool.query(queryText, values)
        .then((result) => {
            console.log(result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log("Error from post router", error)
            res.sendStatus(500);
        })
    // res.send('Hello from post router');

})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log('Delete route called with id of', id);
    console.log('in req.body', req.body);
    let queryText = `DELETE FROM tasks WHERE id=$1;`
    pool.query(queryText, [id]).then((response) => {
        console.log(response);
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('Error in delete router',error);
    })
})

module.exports = router;