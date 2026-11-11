const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Budgie backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});