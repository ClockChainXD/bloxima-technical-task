# How it works

The project is divided into three main parts: Frontend, Backend, and Contracts.
## Setup

### Contracts

Contracts are deployed:
```json
{
  "BloximaCandidateNFT": "0x93a63a5301a20CE98c39Fd48FE513c2298B18A66",
  "BloximaNFT": "0xa73655417dBD4C4ef0e878E7aC7245B197944979"
}
```
### Note: Right now there are 3 NFTs that are minted, you can see them on the frontend.


But you can deploy them again by following the steps below.
1. Go to the contracts folder and run `npm install`
```bash
cd contracts
npm install
```
2. Deploy the contracts
```bash
npx hardhat ignition deploy ignition/modules/BloximaNFTPack.ts --network holesky
```
3. After deploy you will see new deployed contracts on the console, copy the address of BloximaNFT and BloximaCandidateNFT and paste them in the frontend to .env file
```
Go to frontend/bloxima-task/.env.development
VITE_BLOXIMA_NFT_CONTRACT_ADDRESS=NFT Contract deployed address here
VITE_BLOXIMA_CANDIDATE_CONTRACT_ADDRESS=Candidate Contract deployed address here
```
Also go to backend and change the contract addresses from there:
```
Go to backend/config/config.js and change
BLOXIMA_NFT_CONTRACT_ADDRESS: "your deployed BloximaNFT contract address",
```
Note: We don't use candidate contract address because we don't display it on frontend

### Backend
1. Go to the backend folder and run `npm install`
```
cd backend
npm install
```
2. Run the backend server
```
npm run start
```
3. The server will be running on `http://localhost:3000`

### Frontend
1. Go to the frontend folder and run `npm install`
```
cd frontend/bloxima-task
npm install
```
2. Run the frontend server
```
npm run dev
```
3. The frontend will be running on `http://localhost:5173/`

## How to use

# How to mint NFT
1. Open page `http://localhost:5173/`
2. First you need to connect your wallet, click on the `Connect Wallet` button
3. After connecting the wallet you will see the `Mint Candidate NFT` button, click on it and confirm the transaction on your wallet
4. After the transaction is confirmed you will see the `Mint Bloxima NFT` button, click on it and confirm the transaction on your wallet
5. After the transaction is confirmed you will see the `Minted` status on the last NFT card that has minted status. 

# How to register for ordinal mint
1. Open page `http://localhost:5173/`
2. Press the `Register To Ordinals Mint From Here` button
3. Fill the form with your data and press the `Register` button

# Bloxima Technical Task

Bloxima project template.
## Project Structure
```
Bloxima/
├── backend/
│ ├── src/
├── contracts/
│ ├── scripts/
│ ├── src/
├── frontend/
│ ├── public/
│ ├── src/
└── README.md
```
## Frontend
This app lets users connect with their ETH wallets and
interact with our NFT Collection. All smart contracts-related
processes must be in the frontend project via web3Modal.
The rendering and registering steps must be communicated with
the backend project.
### Tasks
1. Develop the front end to allow users to connect their ETH
wallet (ETH Mainnet and Holesky), check eligibility, and mint
tokens via web3Modal.
2. Render the collection in a grid.
 - Render the whole supply of tokens and distinguish
 between minted and available for mint.
3. Provide an option to register for an ordinal mint using a
Bitcoin.com wallet.
## Contracts
Hardhat project containing the Bloxima NFT and Bloxima
Candidate NFT.
### Tasks
1. Develop the Bloxima NFT smart contract only to allow the
Bloxima Candidate NFT owners to mint.
2. Set a maximum supply of 100 tokens available for minting
to Bloxima NFT smart contract.
3. Add basic unit/integration tests.
4. Deploy these contracts to the Holesky network.
4. Set a max allowance of 1 mint per address.
## Backend
The app that will hold BTC Ordinal mint registrations.
1. Support BTC Ordinal mint registrations, storing an Ordinal
(taproot) BTC address, an ETH wallet, and optionally a BTC
payment address. (You need to store these requests only on
the backend project. You don't do the ordinal steps)
## Prerequisites
- Node.js
- npm
- Hardhat (for smart contract development)
- Alchemy RPC URL, which can be created for free at
[Alchemy](https://www.alchemy.com/)
