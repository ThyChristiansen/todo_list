const pg = require('pg');

const config = {
    database : 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', () =>{
    console.log('Connected to progres');
});

pool.on('error', (error)=>{
    console.log('Error connecting to progres',error);
});

module.exports= pool;