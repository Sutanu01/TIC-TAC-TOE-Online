const express = require("express");
const {createServer}= require("http");
const cors = require("cors");
require("dotenv").config();


const app = express();
const server = createServer(app);
app.use(cors());


require("./socket")(server);


const PORT = process.env.SERVER_PORT || 5000;
server.listen(PORT);
