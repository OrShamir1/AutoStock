const express = require('express');
const path = require('path');
const api = require('./routes/stocksApi');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')


app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use('/', api)

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Headers", "Authorization");
  next();
});



const generateAccessToken = function (user) {
  const secretKey = 'my_secret_key';
  return jwt.sign(user, secretKey);
}

function authenticateToken(req, res, next) {
  const secretKey = 'my_secret_key';
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) { return res.sendStatus(401); }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
}



const Users = require('./dist/modules/UserModule')

app.post('/createUser', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword, stocks: [] }
    const newUser = new Users(user)
    newUser.save()
    res.status(201).send("done")
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = await Users.findOne({ name: req.body.name })


  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const saveData = { name: user.name, stocks: user.stocks }
      const accessToken = generateAccessToken(saveData)
      console.log(accessToken);
      res.send({ accessToken })
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send('Not Allowed')
  }
})

app.post('/addtosstock', authenticateToken, (req, res) => {
  try {
    const user = req.user.name
    const symbol = req.body.symbol
    Users.findOneAndUpdate(
      { name: user },
      { $push: { stocks: symbol } },
      { new: true }
    ).then(updatedUser => {
      res.send()
    })

  } catch (error) {
    console.log(error)
    res.status(401).send({ message: 'Invalid token' });
  }
  res.send()
})

app.get('/getstock', authenticateToken, (req, res) => {
  try {
    const user = req.user.name
    Users.findOne({ name: user })
      .then(updatedUser => {
        res.send(updatedUser.stocks)
      })
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: 'Invalid token' });
  }
})

mongoose.connect("mongodb://127.0.0.1:27017/UsersDB", {
  useNewUrlParser: true,
}).catch((err) => console.log(err))

const port = 3005
app.listen(port, function () {
  console.log(`Server running on ${port}`);
})