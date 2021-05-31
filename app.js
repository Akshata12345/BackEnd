const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db');
var companyRoute = require('./routes/companyRoute.js');
var employeeRoute = require('./routes/employeeRoute.js')

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(4000, () => console.log('Server started at port : 4000'));


app.use('/companies', companyRoute)
app.use('/employees', employeeRoute)

