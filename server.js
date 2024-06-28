import http from "http";
import app from "./app/app.js";

// const PORT = process.env.PORT || 5000;
const PORT = 2030;

//create server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`server is up and running on ${PORT}`));
