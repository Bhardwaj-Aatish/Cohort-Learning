const express = require('express')
const mongoose = require('mongoose')

mongoose
  .connect('mongodb+srv://aatishmongodb:Sourav1stCiena@cluster0.kcfiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const app = express();

app.get('/', (req, res) => {
  res.send('Your app is working fine')
})

app.listen(3000);