const http = require('http');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

//set up server
const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({extended: true}));

//cors
app.use(cors());

const PORT = process.env.PORT || 8000;

server.listen(() => {
    console.log(`listening on ${PORT}`)
});