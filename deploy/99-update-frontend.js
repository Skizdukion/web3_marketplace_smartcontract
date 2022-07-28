const { ethers, network } = require("hardhat");
const fs = require("fs");
const { getContractAddress } = require("ethers/lib/utils");

const FRONT_END_CONTRACT_FILE =
  "../frontend_moralis/constants/networkMapping.json";
const FRONT_END_ABI_LOCATION = "../frontend_moralis/constants/abi/";

module.exports = async function () {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating front end enviroment");
    await updateContractAddresses();
    await updateAbi();
  }
};

async function updateContractAddresses() {
  console.log("Updating contract address");
  const nftMarketplace = await ethers.getContract("NftMarketplace");
  const basicNft = await ethers.getContract("BasicNft");
  const basicNftTwo = await ethers.getContract("BasicNftTwo");
  const chainId = network.config.chainId.toString();
  const currentAddress = JSON.parse(
    fs.readFileSync(FRONT_END_CONTRACT_FILE, "utf8")
  );
  if (chainId in currentAddress) {
    if (
      !currentAddress[chainId]["NftMarketplace"].includes(
        nftMarketplace.address
      )
    ) {
      currentAddress[chainId]["NftMarketplace"].push(nftMarketplace.address);
    }

    console.log("");

    if (!currentAddress[chainId]["BasicNft"].includes(basicNft.address)) {
      currentAddress[chainId]["BasicNft"].push(basicNft.address);
    }

    if (
      !currentAddress[chainId]["BasicNftTwo"].includes(nftMarketplace.address)
    ) {
      currentAddress[chainId]["BasicNftTwo"].push(basicNftTwo.address);
    }
  } else {
    currentAddress[chainId] = {
      NftMarketplace: [nftMarketplace.address],
      BasicNft: [basicNft.address],
      BasicNftTwo: [basicNftTwo.address],
    };
  }
  fs.writeFileSync(FRONT_END_CONTRACT_FILE, JSON.stringify(currentAddress));
  console.log("Updating contract address finish");
}

async function updateAbi() {
  console.log("Updating contract abi");
  const nftMarketplace = await ethers.getContract("NftMarketplace");
  const basicNft = await ethers.getContract("BasicNft");
  const basicNftTwo = await ethers.getContract("BasicNftTwo");
  // const chainId = network.config.chainId.toString();
  fs.writeFileSync(
    `${FRONT_END_ABI_LOCATION}NftMarketplace.json`,
    nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
  );
  fs.writeFileSync(
    `${FRONT_END_ABI_LOCATION}BasicNft.json`,
    basicNft.interface.format(ethers.utils.FormatTypes.json)
  );
  fs.writeFileSync(
    `${FRONT_END_ABI_LOCATION}BasicNftTwo.json`,
    basicNftTwo.interface.format(ethers.utils.FormatTypes.json)
  );
  console.log("Updating contract abi finish");
}

module.exports.tags = ["all", "front-end"];
