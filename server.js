const express = require('express');
const path = require('path');
const usersApi = require('./routes/usersApi');
const loginApi = require('./routes/loginApi')
const mongoose = require("mongoose");
const cors = require('cors')


app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', usersApi)
app.use('/', loginApi)

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Headers", "Authorization");
  next();
});





mongoose.connect("mongodb://127.0.0.1:27017/UsersDB", {
  useNewUrlParser: true,
}).catch((err) => console.log(err))

const port = 3005
app.listen(port, function () {
  console.log(`Server running on ${port}`);
})