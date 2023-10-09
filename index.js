const express = require('express');

const app = express();

// Set the port for the server
const PORT = 3000;

// Create a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
