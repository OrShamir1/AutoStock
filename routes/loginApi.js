const express = require('express')
const router = express.Router()
const Users = require('../utilites/UserModule')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const generateAccessToken = function (user) {
  const secretKey = 'my_secret_key';
  return jwt.sign(user, secretKey);
}


router.post('/createUser', async (req, res) => {
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

router.post('/users/login', async (req, res) => {
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





module.exports = router



