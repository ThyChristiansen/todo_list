const pg = require('pg');

// Connect Node to our database
const config = {
    database : 'weekend-to-do-app',// name of our database
    host: 'localhost',// where is your database?
    port: 5432,// this is the default port
    max: 10, // number of connections
    idleTimeoutMillis: 30000 // 30 seconds
};

const pool = new pg.Pool(config); 

pool.on('connect', () =>{
    console.log('Connected to progres');
});

pool.on('error', (error)=>{
    console.log('Error connecting to progres',error);
});

module.exports= pool;