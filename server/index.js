const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sendMail = require('./nodemailer');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL,], // Added localhost for testing
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Pravishraj Server is Running!');
});

// Email Sending Route
app.post('/send-email', async (req, res) => {
  const { name, email, mobile, university, course, message } = req.body;
  console.log('📩 Incoming Enquiry:', name, email);

  // Basic Validation
  if (!name || !email || !mobile) {
    return res.status(400).json({ message: "Name, Email, and Mobile are required." });
  }

  try {
    await sendMail(name, email, mobile, university, course, message);
    return res.status(200).json({ message: 'Enquiry sent successfully!' });
  } catch (error) {
    console.error('SERVER ERROR:', error);
    return res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));