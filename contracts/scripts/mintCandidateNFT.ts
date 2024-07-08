import { ethers } from "hardhat";
import { BloximaCandidateNFT } from "../typechain-types/contracts/BloximaCandidateNFT";
import { BloximaNFT } from "../typechain-types/contracts/BloximaNFT";

async function main() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();
    const candidateNFT = await ethers.getContractAt("BloximaCandidateNFT", "0x93a63a5301a20CE98c39Fd48FE513c2298B18A66");
    await candidateNFT.mintNFT();
    console.log("Candidate NFT minted at");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});