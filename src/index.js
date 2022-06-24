const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const responseTime = require("response-time");

const routes = require('./routes');

const app = express();

app.use(responseTime());
app.use(morgan('short'));
app.use(cors());

app.use(routes);

app.listen(3000);

console.log('Server running on port 3000');