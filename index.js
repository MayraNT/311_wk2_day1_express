const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(express.json())

let counter = users.length;

/* BEGIN - create routes here */

// GET all users
app.get('/users', function(req, res) {
  return res.json(users);
})

// GET one user by id
app.get('/users/:userId', function(req, res) {
  return res.json(users.filter(user => user._id === parseInt(req.params.userId)))
})

// POST hard coded
app.post('/users', function(req, res) {
  
  const newUser = {
    "_id": 6,
    "name": "Joey Tribbiani",
    "occupation": "Actor",
    "avatar": "https://en.wikipedia.org/wiki/Joey_Tribbiani#/media/File:Matt_LeBlanc_as_Joey_Tribbiani.jpg"
  };

  users.push(newUser);
  return res.json(newUser);
})

// POST body-parser
app.post('/users', function(req, res) {

  req.body = {
    "_id": counter + 1,
    "name": req.body.name,
    "occupation": req.body.occupation,
    "avatar": req.body.avatar
  }

  users.push(req.body);
  return res.json(req.body);
})

// PUT update user
app.put('/users/:userId', function(req, res) {
  const updatedUser = req.body;
  users.forEach(user => {
    if (user._id === parseInt(req.params.userId)) {
      user.name = updatedUser.name ? updatedUser.name : user.name;
      user.occupation = updatedUser.occupation ? updatedUser.occupation : user.occupation;
      user.avatar = updatedUser.avatar ? updatedUser.avatar : user.avatar;

      return res.json(user);
    }
  })
})

// DELETE user by id
app.delete('/users/:userId', function(req, res) {
  users.forEach(user => {
    if (user._id === parseInt(req.params.userId)) {
      user.isActive = false;
    }
  })
  res.send('deleted')
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))