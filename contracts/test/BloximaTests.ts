import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("BloximaNFT", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployNFTContracts() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const BloximaCandidateNFT = await hre.ethers.getContractFactory("BloximaCandidateNFT");
        const bloximaCandidateNFT = await BloximaCandidateNFT.deploy();

        const BloximaNFT = await hre.ethers.getContractFactory("BloximaNFT");

        const bloximaNFT = await BloximaNFT.deploy(await bloximaCandidateNFT.getAddress());

        return { bloximaNFT, bloximaCandidateNFT, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should deploy contracts succesfully", async function () {
            const { bloximaNFT, bloximaCandidateNFT } = await loadFixture(deployNFTContracts);
            expect(await bloximaNFT.candidateNFTContract()).to.equal(await bloximaCandidateNFT.getAddress());
        });
    });

    describe("Candidate NFT Contract", function () {
        describe("Set BaseURI", function () {
            it("Should set baseURI succesfully", async function () {
                const { bloximaCandidateNFT } = await loadFixture(deployNFTContracts);
                await bloximaCandidateNFT.setBaseURI("https://bloxima.io/");
                expect(await bloximaCandidateNFT.baseURI()).to.equal("https://bloxima.io/");
            });
            describe("Validations", function () {
                it("Should revert with the right error if called by a non-owner", async function () {
                    const { otherAccount, bloximaCandidateNFT } = await loadFixture(deployNFTContracts);
                    await expect(bloximaCandidateNFT.connect(otherAccount).setBaseURI("https://bloxima.io/")).to.be.revertedWith(
                        "Only owner can set base URI"
                    );
                });
            });
        });
        describe("Mint Candidate NFT", function () {
            it("Should mint a candidate NFT", async function () {
                const { owner, bloximaCandidateNFT } = await loadFixture(deployNFTContracts);
                await bloximaCandidateNFT.mintNFT();
                expect(await bloximaCandidateNFT.balanceOf(await owner.getAddress())).to.equal(1);
            });
            describe("Validations", function () {
                it("Should revert with the right error if called more than once with same wallet", async function () {
                    const { bloximaCandidateNFT, bloximaNFT } = await loadFixture(deployNFTContracts);
                    await bloximaCandidateNFT.mintNFT();
                    await expect(bloximaCandidateNFT.mintNFT()).to.be.revertedWith(
                        "You can only mint one NFT per wallet"
                    );
                });
            });
        });
    });

    describe("Bloxima NFT Contract", function () {
        describe("Mint Bloxima NFT", function () {
            describe("Set Candidate NFT Contract", function () {
                it("Should set candidate NFT contract succesfully", async function () {
                    const { bloximaNFT, bloximaCandidateNFT } = await loadFixture(deployNFTContracts);
                    await bloximaNFT.setCandidateNFTContract(await bloximaCandidateNFT.getAddress());
                    expect(await bloximaNFT.candidateNFTContract()).to.equal(await bloximaCandidateNFT.getAddress());
                });
                describe("Validations", function () {
                    it("Should revert with the right error if called by a non-owner", async function () {
                        const { otherAccount, bloximaNFT, bloximaCandidateNFT } = await loadFixture(deployNFTContracts);
                        await expect(bloximaNFT.connect(otherAccount).setCandidateNFTContract(await bloximaCandidateNFT.getAddress())).to.be.revertedWith(
                            "Only owner can set candidate NFT contract"
                        );
                    });
                });
            });
            it("Should mint Bloxima NFT succesfully", async function () {
                const { bloximaCandidateNFT, bloximaNFT, owner } = await loadFixture(
                    deployNFTContracts
                );
                await bloximaCandidateNFT.mintNFT();
                await bloximaNFT.mintNFT();
                expect(await bloximaNFT.balanceOf(await owner.getAddress())).to.equal(1);
            });

            describe("Validations", function () {
                it("Should revert with the right error if called more than once with same wallet", async function () {
                    const { bloximaCandidateNFT, bloximaNFT } = await loadFixture(deployNFTContracts);
                    await bloximaCandidateNFT.mintNFT();
                    await bloximaNFT.mintNFT();
                    await expect(bloximaNFT.mintNFT()).to.be.revertedWith(
                        "You can only mint one NFT per wallet"
                    );
                });
                it("Should revert with the right error if called without minting a candidate NFT", async function () {
                    const { bloximaNFT } = await loadFixture(deployNFTContracts);
                    await expect(bloximaNFT.mintNFT()).to.be.revertedWith(
                        "You are not a candidate"
                    );
                });
                it("Should revert with right error if called after maxSupplyReached ", async function () {
                    const { owner, bloximaCandidateNFT, bloximaNFT } = await loadFixture(deployNFTContracts);
                    const one_hundred_signers = await hre.ethers.getSigners();
                    for (let i = 0; i < 100; i++) {
                        await bloximaCandidateNFT.connect(one_hundred_signers[i]).mintNFT();
                        await bloximaNFT.connect(one_hundred_signers[i]).mintNFT();
                    }
                    await bloximaCandidateNFT.connect(one_hundred_signers[100]).mintNFT();
                    await expect(bloximaNFT.connect(one_hundred_signers[100]).mintNFT()).to.be.revertedWith(
                        "Max supply reached"
                    );
                });
            });
        });
    });
});