const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ItemModel = require("./model");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/crud-micro");

app.get("/", async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8002, () => {
  console.log("Read Server is running on port 8002");
});
