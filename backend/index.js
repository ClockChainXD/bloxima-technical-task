const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Registration = require('./models/Registration');
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Bloxima Backend Task Server is running');
});

app.post('/registerationToOrdinals', (req, res) => {
    const { ordinalAddress, ethAddress, btcPaymentAddress } = req.body;
    const registration = new Registration({ ordinalAddress, ethAddress, btcPaymentAddress });
    registration.save()
        .then(() => {
            res.status(200).send('Registration successful');
        })
        .catch((error) => {
            console.error(error);
            res.status(400).send('Registration failed', error);
        }
    );
});

app.listen(port, () => {
  console.log(`[server]: Bloxima Server is running at http://localhost:${port}`);
});