const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");

TOKEN_ID = "2";
// const PRICE = ethers.utils.parseEther("0.1");

async function cancel() {
  const nftMarketplace = await ethers.getContract("NftMarketplace");
  const basicNft = await ethers.getContract("BasicNftTwo");
  const listing = await nftMarketplace.getListing(basicNft.address, TOKEN_ID);
  console.log("")
  const tx = await nftMarketplace.buyItem(basicNft.address, TOKEN_ID, {
    value: listing.price,
  });
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
