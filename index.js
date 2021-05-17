const express = require('express');
require("./db/database.js")
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const port = 8080;

// Import Routes
const libraryRoute = require('./routes/library');
const signinRoute = require('./routes/signin');


app.use('/api/v1/library', libraryRoute);
app.use('/api/v1/signin', signinRoute);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

