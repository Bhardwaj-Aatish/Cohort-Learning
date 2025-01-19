const express = require('express');
// const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const app = express();

const users = [];
const JWT_SECRET = 'thisismysecretkeylajdflajdflk'
// var corsOptions = {
//   origin: 'http://localhost:5173',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(express.json())
app.use(cors())

// app.use(express.static(path.join(__dirname, '../frontend/dist')));

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

  const isUserAlreadyPresent = users.find(user => user.username === username);

  // issue with some ?
  if(isUserAlreadyPresent) {
    res.status(403).send({
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

// todo serve frontend from backend only
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });


app.get('/me', auth, (req, res) => {
    const user = users.find(user => user.username === req.username);
    res.send({
      username: user.username,
      password: user.password
    })
})

app.listen(5000);