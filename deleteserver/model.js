const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const ItemModel = mongoose.model("Item", ItemSchema);

module.exports = ItemModel;
