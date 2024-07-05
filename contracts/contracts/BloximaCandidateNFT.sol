// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BloximaCandidateNFT is ERC721 {
    uint256 public tokenCounter;
    address public owner;
    string public baseURI = "https://bloxima-candidate-nft.vercel.app/api/candidateNFT/uri";
    mapping(address => bool) public hasMintedNFT;

    constructor() ERC721("BloximaCandidateNFT", "BCNFT") {
        tokenCounter = 0;
        owner = msg.sender;
    }

    modifier onlyOncePerWallet() {
        require(!hasMintedNFT[msg.sender], "You can only mint one NFT per wallet");
        _;
    }

    function _baseURI() internal override view returns (string memory){
        return baseURI;
    }

    function setBaseURI(string memory _baseURIString) public {
        require(msg.sender == owner, "Only owner can set base URI");
        baseURI = _baseURIString;
    }

    function tokenURI (uint256 _tokenId) public view override returns (string memory) {
        return "https://bloxima-candidate-nft.vercel.app/api/candidateNFT/1";
    }

    function mintNFT() public onlyOncePerWallet {
        _safeMint(msg.sender, tokenCounter);
        tokenCounter++;
        hasMintedNFT[msg.sender] = true;
    }
}
