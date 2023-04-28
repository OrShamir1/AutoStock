const express = require('express');
const path = require('path');
const api = require('./routes/stocksApi');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/', api)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

const Users = require('./dist/modules/UserModule')

app.post('/createUser', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword ,stocks: []}
    const newUser = new Users(user)
    newUser.save()
    res.status(201).send("done")
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = await Users.findOne({name: req.body.name})

  
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})


mongoose.connect("mongodb://127.0.0.1:27017/UsersDB", {
  useNewUrlParser: true,
}).catch((err)=> console.log(err))

const port = 3005
app.listen(port, function () {
    console.log(`Server running on ${port}`);
})