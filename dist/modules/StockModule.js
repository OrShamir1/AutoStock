const mongoose = require("mongoose");

const Schema = mongoose.Schema

const stockSchema = new Schema({
    name: String,
    interval: String,
    info: Array
    }
    )

const Stocks = mongoose.model("stock", stockSchema)
module.exports = Stocks