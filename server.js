const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const listsRouter = require('./routes/lists');
const cardsRouter=require('./routes/cards');
const interviewQuestionsRouter=require('./routes/interviewQuestions');
const database = require('./database');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Database connection
const connection = database.connection;
connection.once('open',  ()=>{
    console.log("MongoDB database connection established successfully ")
})

app.use('/users', usersRouter);
app.use('/board', boardRouter);
app.use('/lists', listsRouter);
app.use('/cards', cardsRouter);
app.use('/interviewquestions', interviewQuestionsRouter);




app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

//Service worker config
// app.get("/service-worker.js", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
//   });
//   app.get("*", function response(req, res) {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
//   });

