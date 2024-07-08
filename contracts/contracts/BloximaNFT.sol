// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./BloximaCandidateNFT.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BloximaNFT is ERC721 {
    uint256 public tokenCounter;
    address public owner;
    BloximaCandidateNFT public candidateNFTContract;
    uint256 public maxSupply = 100;
    mapping(address => bool) public hasMintedNFT;

    constructor(address bloximaCandidateNFTAddress) ERC721("BloximaNFT", "BLOX") {
        owner = msg.sender;
        candidateNFTContract = BloximaCandidateNFT(bloximaCandidateNFTAddress);
    }

    modifier isCandidate() {
        require(candidateNFTContract.balanceOf(msg.sender) > 0, "You are not a candidate");
        _;
    }

    modifier onlyOncePerWallet() {
        require(!hasMintedNFT[msg.sender], "You can only mint one NFT per wallet");
        _;
    }

    modifier maxSupplyNotReached() {
        require(tokenCounter < maxSupply, "Max supply reached");
        _;
    }

    function totalSupply() public view returns (uint256) {
        return maxSupply;
    }

    function setCandidateNFTContract(address _bloximaCandidateNFTAddress) public {
        require(msg.sender == owner, "Only owner can set candidate NFT contract");
        candidateNFTContract = BloximaCandidateNFT(_bloximaCandidateNFTAddress);
    }

    function tokenURI (uint256 _tokenId) public view override returns (string memory) {
        return string(abi.encodePacked("ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/", Strings.toString(_tokenId)));
    }

    function mintNFT() public isCandidate onlyOncePerWallet maxSupplyNotReached {
        tokenCounter++;
        _safeMint(msg.sender, tokenCounter);
        hasMintedNFT[msg.sender] = true;
    }
}
