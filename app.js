// app.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to check if current time is within working hours
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = now.getHours(); // 0 to 23

  // Check if it's a weekday and within working hours
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(403).send('Access forbidden: The application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
});

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
  res.render('Home');
});

app.get('/Service', (req, res) => {
  res.render('Service');
});

app.get('/Contact', (req, res) => {
  res.render('Contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
