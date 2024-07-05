import { ethers } from "hardhat";
import { BloximaCandidateNFT } from "../typechain-types/contracts/BloximaCandidateNFT";
import { BloximaNFT } from "../typechain-types/contracts/BloximaNFT";

async function main() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();
    const candidateNFT = await ethers.getContractAt("BloximaCandidateNFT", "0xB4Fb7F28c05772A82f8dee2D271a9456Be3A8ccD");
    await candidateNFT.mintNFT();
    console.log("Candidate NFT minted at: ", await candidateNFT.ownerOf(1));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});