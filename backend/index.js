const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Registration = require('./models/Registration');
const { ethers } = require("ethers");
const bloximaNFTABI = require('./BloximaNFTABI.json');
const config = require('./config/config');
const cors = require('cors');

let db = connectDB();

const app = express();
const port = config.PORT;

app.use(
    cors({
        origin: [
            "http://localhost:5173"
        ],
        credentials: true,
    })
);

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Bloxima Backend Task Server is running');
});

app.post('/registerationToOrdinals', async (req, res) => {
    const { ordinalAddress, ethAddress, btcPaymentAddress } = req.body;
    db = await db;
    const registrations = db.collection("Registrations");
    registrations.insertOne({ ordinalAddress, ethAddress, btcPaymentAddress })
        .then(() => {
            console.log('Registration successful')
            res.status(200).send('Registration successful');
        })
        .catch((error) => {
            console.error(error);
            res.status(400).send('Registration failed', error);
        }
    );
});

app.get('/nfts', async (req, res) => {
    let { data_size, offset } = req.query;
    //Use ethers to fetch nfts from bloxima nft smart contract
    const holeskyProvider = new ethers.providers.JsonRpcProvider(config.HOLESKY_RPC_URL);
    const bloximaNFTContract = new ethers.Contract(config.BLOXIMA_NFT_CONTRACT_ADDRESS, bloximaNFTABI, holeskyProvider);
    const mintedCount = Number(await bloximaNFTContract.tokenCounter())
    console.log(mintedCount)
    /* if(offset > mintedCount) {
        res.status(400).send('Offset is greater than minted nfts');
    } */
    data_size = Math.min(data_size, 100);
    let nfts = [];
    for (let i = Number(offset); i < data_size; i++) {
        const nftURI = await bloximaNFTContract.tokenURI(i + 1);
        const urlToFetch = new URL(`https://${nftURI}`);
        const nftMetadataResponse = (await fetch(urlToFetch));
        const nftMetadata = await nftMetadataResponse.json();
        const nft_image = nftMetadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
        const nft_status = mintedCount >= Number(offset) + Number(i) + 1 ? "minted" : "not_minted"
        nfts.push({ status: nft_status, image: nft_image, name: `Bloxima NFT ${i + 1}` });
    }
    res.status(200).json(nfts);
});

app.listen(port, () => {
    console.log(`[server]: Bloxima Server is running at http://localhost:${port}`);
});