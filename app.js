// app.js
const express = require('express');
const connectDB = require('./db');
const Address = require('./models/Address');
const sendEmail = require('./mailer');

const app = express();
app.use(express.json());

connectDB();

app.post('/check-address', async (req, res) => {
  const { address } = req.body; 

  try {
    const addressRecord = await Address.findOne({ address });

    if (addressRecord) {
      // If a match is found, send an email
      sendEmail(
        addressRecord.email,
        'Blockchain Address Match Found',
        `The blockchain address ${address} has been found in our database.`
      );
      res.status(200).json({ message: 'Match found and email sent.' });
    } else {
      // If no match is found, continue listening
      res.status(404).json({ message: 'No match found.' });
    }
  } catch (err) {
    console.error('Error searching for address:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});