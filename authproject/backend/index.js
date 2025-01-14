const express = require('express');
const app = express();

const users = [];

app.use(express.json())

const generateToken = () => {

  let token = '';
  const options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  for(let i=0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token
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

  if(user) {
    const token = generateToken()
    user.token = token
    res.send({
      token
    })
  } else {
    res.status(403).send({
      message: 'You are not signed in'
    })
  }
})


app.get('/me', (req, res) => {
  const token = req.headers.token;
  const user = users.find(user => user.token === token);

  if(user) {
    res.send({
      username: user.username,
      password: user.password
    })
  } else {
    res.status(403).send({
      message: 'You are not signed in'
    })
  }
})

app.listen(3000);