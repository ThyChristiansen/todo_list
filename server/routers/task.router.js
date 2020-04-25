const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req,res)=>{
    let queryText = `SELECT * FROM "task-list" ORDER BY "to_do_list";`
    pool.query(queryText)
    .then(result =>{
        res.send(result.rows);
    }).catch(error =>{
        console.log('Error in getting task',error);
        res.sendStatus(500);
    })
})

// router.get('/', (req,res)=>{
  
//         res.send("hello from router get");
//     // }).catch(error =>{
//     //     console.log('Error in getting task',error);
//     //     res.sendStatus(500);
//     // })
// })




module.exports = router;
