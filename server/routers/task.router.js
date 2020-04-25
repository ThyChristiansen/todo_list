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
    // let newTask = req.body;
    // console.log('Adding new task: ', newTask);
    res.send('Hello from post router');

    // let queryText = `INSERT INTO "tasks" ( "listToDo" )
    //                 VALUES ($1);`
    // pool.query(queryText, [newTask.listToDo])
    //     .then(result => {
    //         res.sendStatus(201);
    //     })
    //     .catch((error) => {
    //         console.log("Error from post router", error)
    //         res.sendStatus(500);
    //     })
})




    module.exports = router;
