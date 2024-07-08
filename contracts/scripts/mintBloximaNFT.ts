import { ethers } from "hardhat";
import { BloximaCandidateNFT } from "../typechain-types/contracts/BloximaCandidateNFT";
import { BloximaNFT } from "../typechain-types/contracts/BloximaNFT";

async function main() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();
    const bloximaNFT = await ethers.getContractAt("BloximaNFT", "0xa73655417dBD4C4ef0e878E7aC7245B197944979");
    await bloximaNFT.mintNFT();
    console.log("Bloxima NFT minted");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});