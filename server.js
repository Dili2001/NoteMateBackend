const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const User = require('./models/User');
const Note = require('./models/Note');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/notes', noteRoutes);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    // Sync the models
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
