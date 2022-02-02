const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();
// require('dotenv').config({ path: 'dev.env' })

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
