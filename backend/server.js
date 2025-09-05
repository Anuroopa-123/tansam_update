const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sendInternshipEmail, sendContactMessage, sendFeedbackEmail } = require('./mailService');

const app = express();
const allowedOrigins = ['http://localhost:4200', 'https://tansam.org'];

// CORS config to allow only your frontend domain
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));


app.use(bodyParser.json());

app.post('/api/internship/apply', async (req, res) => {
  try {
    await sendInternshipEmail(req.body);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    await sendContactMessage(req.body);
    res.status(200).send({ message: 'Contact message sent successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send contact message' });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    await sendFeedbackEmail(req.body);
    res.status(200).json({ message: 'Feedback email sent successfully' });
  } catch (error) {
    console.error('Feedback email error:', error);
    res.status(500).json({ error: 'Failed to send feedback email' });
  }
});

// Port for dev or production
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
