const express = require('express');
require('./db/mongoose');
const cors = require('cors');
const userRouter = require('./routers/user');
const campgroundRouter = require('./routers/campground');

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(campgroundRouter);

module.exports = app;
