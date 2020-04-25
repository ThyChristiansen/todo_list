const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./routers/task.router');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/tasks', taskRouter);

app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log('listen to PORT', PORT);
})
