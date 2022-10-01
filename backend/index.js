const connectTomongo=require('./db') // import mongoose db
const express = require('express') // import express
const cors=require('cors');

// connect mongo db
connectTomongo();
const app = express();
const port = 5000

// middleware validation
app.use(express.json());
app.use(cors());

// making route
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// define port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})