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


// PUT
// app.put('/users/1', function(req, res) {
//   const userOne = users[0];
//   userOne.occupation = 'Special Ops';
//   return res.json(userOne);
// })

// app.put('/users/:userID', function(req, res) {
//   req.body = users.filter(user => user._id === parseInt(req.params.userId));
//   user = req.body;
//   user.occupation = 'Special Ops';
//   // users.find(user => user._id === parseInt(req.params.userId))
//   return res.json(req.body);
// })

// DELETE user by id
// app.delete('/users/1', function(req, res) {
//   users.shift()
//   res.send('deleted');
// })

// app.delete('/users/:userId', function(req, res) {
//   users.filter(user => user._id === parseInt(req.params.id))
//   res.send('deleted');
// })

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))