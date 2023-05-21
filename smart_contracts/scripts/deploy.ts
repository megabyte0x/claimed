import { ethers } from "hardhat";
import hre from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // We get the contract to deploy
  const Quest = await ethers.getContractFactory("Quest");
  const quest = await Quest.deploy();

  await quest.deployed();

  console.log("Quest address:", quest.address);

  // Verify the contract
  await hre.run("verify:verify", {
    address: "0xC8A35465e06d1C90c5664901116f885461dEB1E4",
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
