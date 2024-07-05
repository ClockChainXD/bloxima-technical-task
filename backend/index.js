const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Registration = require('./models/Registration');
const { ethers } = require("ethers");
const bloximaNFTABI = require('./BloximaNFTABI.json');
const config = require('./config/config');


const db = connectDB();

const app = express();
const port = config.PORT;

app.get('/', (req, res) => {
  res.send('Bloxima Backend Task Server is running');
});

app.post('/registerationToOrdinals', (req, res) => {
    const { ordinalAddress, ethAddress, btcPaymentAddress } = req.body;
    const registration = db.collection("Registrations").insertOne({ordinalAddress, ethAddress, btcPaymentAddress})
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

app.get('/nfts' , async (req, res) => {
    let { data_size, offset } = req.query;
    //Use ethers to fetch nfts from bloxima nft smart contract
    const holeskyProvider = new ethers.providers.JsonRpcProvider(config.HOLESKY_RPC_URL);
    const bloximaNFTContract = new ethers.Contract(config.BLOXIMA_NFT_CONTRACT_ADDRESS, bloximaNFTABI, holeskyProvider);
    const mintedCount = await bloximaNFTContract.tokenCounter();
    if(offset > mintedCount) {
        res.status(400).send('Offset is greater than minted nfts');
    }
    data_size = data_size + offset > mintedCount ? mintedCount - offset : data_size;
    let nfts = [];
    for(let i = offset; i < data_size; i++) {
        const nft = await bloximaNFTContract.tokenURI(i+1);
        console.log(nft);
        nfts.push(nft);
    }
    res.status(200).json(nfts);
});

app.listen(port, () => {
  console.log(`[server]: Bloxima Server is running at http://localhost:${port}`);
});