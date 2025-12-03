const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ItemModel = require("./model");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/crud-micro");

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedItem = await ItemModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8003, () => {
  console.log("Update Server is running on port 8003");
});
