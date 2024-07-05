import { ethers } from "hardhat";
import { BloximaCandidateNFT } from "../typechain-types/contracts/BloximaCandidateNFT";
import { BloximaNFT } from "../typechain-types/contracts/BloximaNFT";

async function main() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();
    const bloximaNFT = await ethers.getContractAt("BloximaNFT", "0x66A08549c2e990c5c3A7bF8C3Adde5Fe4E5465C1");
    await bloximaNFT.mintNFT();
    console.log("Bloxima NFT minted at: ", await bloximaNFT.ownerOf(1));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});