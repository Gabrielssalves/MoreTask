const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_CNSTRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  useCreateIndex: true,
  useFindAndModify: true
}).catch(err => console.log(err.reason));

mongoose.Promise = global.Promise;

module.exports = mongoose;