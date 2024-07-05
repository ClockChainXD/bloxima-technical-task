

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
Bloxima Technical Task 2
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
Bloxima Technical Task 3
- Alchemy RPC URL, which can be created for free at
[Alchemy](https://www.alchemy.com/)
