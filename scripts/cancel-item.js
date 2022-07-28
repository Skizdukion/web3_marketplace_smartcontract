const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");

async function cancel() {
  const nftMarketplace = await ethers.getContract("NftMarketplace");
  const basicNft = await ethers.getContract("BasicNftTwo");
  const tx = await nftMarketplace.cancelListing(basicNft.address, "1");
  await tx.wait(1);
  if (network.config.chainId == "31337") {
    await moveBlocks(1, 1000);
  }
}

cancel()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
