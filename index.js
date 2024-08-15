require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const MongoStore = require('connect-mongo')
const blogRoutes = require('./routes/blogsRoute');
const dbUrl = 'mongodb://127.0.0.1:27017/blog-backend';
const secret = process.env.SECRET || 'secretforblogpost';

mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 1000 * 60 * 60 * 24 * 7,
})
store.on('error', err => console.log(err));

//middleware
app.use(express.json());
app.use(express.json())
app.use(cors())
app.use('/blogpost', blogRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} 😀`);
});



// schema=>controller=>route=>middleware=>index
