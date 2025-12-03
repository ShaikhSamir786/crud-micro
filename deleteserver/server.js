const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ItemModel = require("./model");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/crud-micro");

app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await ItemModel.findByIdAndDelete(id);
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(8004, () => {
    console.log("Delete Server is running on port 8004");
});
