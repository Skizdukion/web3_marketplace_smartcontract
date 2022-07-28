const { network, ethers } = require("hardhat");
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

const VRF_SUB_FUND_AMOUNT = "1000000000000000000000";

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const nftMarketplaceContract = await deploy("NftMarketplace", {
    contract: "NftMarketplace",
    from: deployer,
    log: true,
    waitConfirmation: VERIFICATION_BLOCK_CONFIRMATIONS,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    console.log("Verifying ......");
    await verify(nftMarketplaceContract.address, []);
  }
  console.log("Finishing deploy marketplace -----------");
};

module.exports.tags = ["all", "marketplace"];
