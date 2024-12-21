// Import required modules
const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Error handling middleware function
function errorHandler(err, req, res, next) {
  if (err) {
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
}

// User registration handler
app.post('/register', (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    // Validate first name and last name
    if (!firstName || firstName[0] !== firstName[0].toUpperCase()) {
      throw new Error('First name must start with an uppercase letter.');
    }
    if (!lastName || lastName[0] !== lastName[0].toUpperCase()) {
      throw new Error('Last name must start with an uppercase letter.');
    }

    // Validate password
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      throw new Error('Password must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long.');
    }

    // Validate email address
    if (!email || !email.includes('@')) {
      throw new Error('Email must contain the @ symbol.');
    }

    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      throw new Error('Phone number must be at least 10 digits long.');
    }

    // If all validations pass, respond with success
  return res.status(200).json({ message: 'User registration successful!' });
  } catch (error) {
    next(error);
  }
});

// Use the error handling middleware
app.use(errorHandler);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
