const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");

async function cancel() {
  const nftMarketplace = await ethers.getContract("NftMarketplace");
  const basicNft = await ethers.getContract("BasicNft");
  const basicNftTwo = await ethers.getContract("BasicNftTwo");
  console.log(nftMarketplace.address);
  console.log(basicNft.address);
  console.log(basicNftTwo.address);
}

cancel()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
