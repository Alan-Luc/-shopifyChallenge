const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const entryRoutes = require("./routes/entry.routes");
const trashRoutes = require("./routes/trash.routes");

//set up server
const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

//cors
const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

//routes
app.use("/inventory", entryRoutes, cors(corsOptions));
app.use("/trash", trashRoutes, cors(corsOptions))


const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});