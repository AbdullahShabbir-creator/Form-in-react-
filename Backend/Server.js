const express = require('express');
const cors = require('cors');
const connectdb = require('./Database/Db'); 
const newAdmission = require('./Routes/AdmissionRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


connectdb();

app.use('/api', newAdmission); 

// Default route (optional)
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
