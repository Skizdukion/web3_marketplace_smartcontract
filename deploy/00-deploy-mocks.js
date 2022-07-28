const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

const BASE_FEE = ethers.utils.parseEther("0.25");
const GAS_PRICE_LINK = 1e9;

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  // const chainId = network.config.chainId;
  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks...");
    await deploy("VRFCoordinatorV2Mock", {
      contract: "VRFCoordinatorV2Mock",
      from: deployer,
      log: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    });
    await deploy("BasicNft", {
      contract: "BasicNft",
      from: deployer,
      log: true,
    });

    await deploy("BasicNftTwo", {
      contract: "BasicNftTwo",
      from: deployer,
      log: true,
    });
    log("Mocks Deployed!");
    log("------------------------------------------------");
  }
};
module.exports.tags = ["all", "mocks"];
