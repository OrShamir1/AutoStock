const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    password: String,
    stocks:Array
    }
    )

const Users = mongoose.model("user", userSchema)
module.exports = Users