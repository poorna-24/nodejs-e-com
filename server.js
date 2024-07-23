import http from "http";
import app from "./app/app.js";
import dotenv from "dotenv";
dotenv.config();

// const PORT = process.env.PORT || 2030;
const PORT = 2030;

//create server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`server is up and running on ${PORT}`));
