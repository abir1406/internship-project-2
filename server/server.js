const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('DB Error:', err));


  