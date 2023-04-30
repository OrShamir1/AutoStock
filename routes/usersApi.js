const express = require('express')
const router = express.Router()
const authenticateToken = require('../utilites/authenticateToken')
const Users = require('../utilites/UserModule')

router.post('/addtosstock', authenticateToken, (req, res) => {
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
  
  router.get('/getstock', authenticateToken, (req, res) => {
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


module.exports = router



