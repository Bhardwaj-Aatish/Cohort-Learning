const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'randomjlajdfoaejlsfa'

const users = []
const todos = []

const app = express();
app.use(express.json());

function auth (req, res, next) {
  const token = req.headers.token;

  const currentUserEmail = jwt.verify(token, JWT_SECRET)

  if(currentUserEmail) {
    req.email = currentUserEmail;
    next();
  } else {
    res.status(403).send({
      message: 'You are not allowed'
    })
  }
}

app.post('/signup', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  
  const user = users.find(user => user.email === email)

  if(user) {
    res.status(403).send({
      message: 'Email is not unique'
    })
  } else {
    users.push({
      name,
      email,
      password
    })
    res.send({
      message: 'You have signed up successfully'
    })
  }
})

app.post('/signin', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const user = users.find(user => user.email === email && user.password === password && user.name === name)

  if(user) {
    const token = jwt.sign({
      email
    }, JWT_SECRET);

    res.send({
      token
    })
  } else {
    res.status(403).send({
      message: 'Credentials are incorrect'
    })
  }
})

app.post('/todo', auth,  (req, res) => {
  const title = req.body.title;
  const done = req.body.title;

  todos.push({
    title,
    done
  })

  res.send({
    message: 'Todos sent successfully'
  })

})

app.get('/todos', auth, (req, res) => {
  res.send({todos})
})

async function startServer() {
  // await mongoose.connect("mongodb+srv://aatishmongodb:Sourav1stCiena@cluster0.kcfiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/mongodbTest").then(() => console.log("your mongodb is connected now"))
  app.listen(3000);
}

startServer()
