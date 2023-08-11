const express = require('express');
const User = require('./db/User')
require('./db/config');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())

app.post('/register', async (req, res) => {

  let user = new User(req.body)
  let result = await user.save();
  res.send(result);
})

app.post('/login', async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password")
    if (user) {
      res.send(user)
    }
    else {
      res.send({ result: "user not fount" })
    }
  } else {
    res.send({ result: "user not fount" })
  }
})
app.use('/', (req, res) => {
  res.send('home page')
})
app.listen(1000, () => {
  console.log('Server listening on port 1000')
});


