import { ethers } from "hardhat";

async function main() {
  const questContract = "Quest";

  const spongePoseidonLib = "0x12d8C87A61dAa6DD31d8196187cFa37d1C647153";
  const poseidon6Lib = "0xb588b8f07012Dc958aa90EFc7d3CF943057F17d7";

  const Quest = await ethers.getContractFactory(questContract, {
    libraries: {
      SpongePoseidon: spongePoseidonLib,
      PoseidonUnit6L: poseidon6Lib,
    },
  });
  const quest = await Quest.deploy();

  await quest.deployed();
  console.log("Quest contract address:", quest.address);
}
