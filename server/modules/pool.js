const pg = require('pg');

const config = {
    database : 'weekend_to_do_list',
    host: 'localhost',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 10000
};

const pool = new pg.Pool(config);

pool.on("connect", () =>{
    console.log('Connected to progres');
})

pool.on("error", ()=>{
    console.log('Error connecting to progres',err);
})

module.exports= pool;