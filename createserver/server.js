const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ItemModel = require("./model");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/crud-micro");

app.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;
        const newItem = new ItemModel({ name, description });
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(8001, () => {
    console.log("Create Server is running on port 8001");
});
