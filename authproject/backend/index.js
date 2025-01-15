const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();

const users = [];
const JWT_SECRET = 'randomkeyajdljalfdj234js'

app.use(express.json())

function auth (req, res, next) {
  const token = req.headers.token;
  const currentUser = jwt.verify(token, JWT_SECRET);

  if(currentUser.username) {
    req.username = currentUser.username;
    next()
  } else {
    res.status(403).send({
      message: 'You are not signed in'
    })
  }
}

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const isUserAlreadyPresent = users.some(user => user.username === username);

  if(isUserAlreadyPresent) {
    res.send({
      message: 'Username is not unique'
    })
  } else {
    users.push({
      username,
      password
    });

    res.send({
      message: 'You have signed up successfully'
    });
  }
})


app.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    const token = jwt.sign({
      username
    }, JWT_SECRET)
    res.send({
      token
    })
  } else {
    res.status(403).send({
      message: 'You are not signed in'
    })
  }
})


app.get('/me', auth, (req, res) => {
    const user = users.find(user => user.username === req.username);
    res.send({
      username: user.username,
      password: user.password
    })
})

app.listen(3000);