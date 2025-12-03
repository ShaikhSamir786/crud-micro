const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/create", proxy(process.env.CREATE_SERVER_URL || "http://localhost:8001"));
app.use("/read", proxy(process.env.READ_SERVER_URL || "http://localhost:8002"));
app.use("/update", proxy(process.env.UPDATE_SERVER_URL || "http://localhost:8003"));
app.use("/delete", proxy(process.env.DELETE_SERVER_URL || "http://localhost:8004"));

app.listen(8000, () => {
    console.log("Main Server is running on port 8000");
});
