require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const User = require('./models/User');
const logger = require('./middleware/logger');
const app = express();
app.use(express.json(), morgan('dev'), logger, mockAuth);

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://joyalaugustin:PVBXFQdKnDpp4vUN@cluster0.cz1jao1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => (console.error('DB error:', err), process.exit(1)));

app.get('/api/users', allowRoles('Admin', 'Member', 'Guest'), async (_, res) => {
  res.json(await User.find().lean());
});

app.delete('/api/users/:id', allowRoles('Admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    user ? res.json({ message: 'User deleted' }) : res.status(404).json({ error: 'User not found' });
  } catch { res.status(400).json({ error: 'Invalid id' }); }
});

