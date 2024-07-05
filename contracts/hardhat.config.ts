import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      accounts: {
        count: 101,
      },
    },
    holesky: {
      url: "https://ethereum-holesky-rpc.publicnode.com",
      accounts: ["fca819ef6b23debaa36b7f987e5cd26b73290a06a26a87312deb2973933ebbe7"],
    }
  },
};

export default config;
