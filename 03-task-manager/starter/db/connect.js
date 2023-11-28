const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = (url) => {
   return mongoose.connect(url,
      {
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: false,
         useUnifiedTopology: true
      })   
}

module.exports = dbConnect;