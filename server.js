import http from "http";
import app from "./app/app.js";

// const PORT = process.env.PORT || 2024;
const PORT = 2024;

//create server
const server = http.createServer(app);
server.listen(PORT, console.log(`server is up and running on ${PORT}`));
