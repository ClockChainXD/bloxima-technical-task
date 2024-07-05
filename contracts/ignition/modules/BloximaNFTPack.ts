import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BloximaNFTPack = buildModule("BloximaNFTPack", (m) => {

  const candidateNFT = m.contract("BloximaCandidateNFT", []);

  const bloximaNFT = m.contract("BloximaNFT", [candidateNFT], { after: [candidateNFT]});
  return { candidateNFT, bloximaNFT};
});

export default BloximaNFTPack;
