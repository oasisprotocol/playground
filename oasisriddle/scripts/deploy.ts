import { ethers } from "hardhat";
import { questions, answers, couponCodes, couponKeys } from "./data.json";

async function main() {
  const Riddle = await ethers.getContractFactory("Riddle");
  const riddle = await Riddle.deploy(questions, answers, couponCodes, couponKeys);
  await riddle.deployed();

  console.log("Riddle deployed to ", riddle.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
