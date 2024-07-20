const mongoose = require('mongoose')
require('dotenv').config();
const dbURI = process.env.MONGODB_URI
// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// };
mongoose.connect(dbURI)