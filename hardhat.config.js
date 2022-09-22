/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const { getJsonWalletAddress } = require("ethers/lib/utils");

require("hardhat-watcher");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.12",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      /*      
        notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      
      */
    },
/*     rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.RINKEBY_PK],
    }, */
  },
  watcher: {
    compile: {
      tasks: ["compile"],
    },
    test: {
      tasks: ["test"],
      files: ["contracts", "test"],
    },
  },
  gasReporter: {
    coinmarketcap: process.env.COINMARKETCAP_APIKEY,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_KEY,
  },
};
