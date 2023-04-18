import { ethers, artifacts } from "hardhat";
import { swags, probabilities } from "./data.json";
import path from "node:path";
import {BaseContract} from "ethers";

async function main() {
  const RandomSwag = await ethers.getContractFactory("RandomSwag");
  const rs = await RandomSwag.deploy();
  await rs.deployed();
  console.log("RandomSwag deployed to "+rs.address);

  for (let i=0; i<swags.length; i++) {
    console.log("Adding swag "+(i+1)+"/"+swags.length+"...");
    await (await rs.addSwag(swags[i].name, swags[i].image)).wait();
  }

  console.log("Setting swag probabilities...");
  await (await rs.setProbabilities(probabilities)).wait();

  // We also save the contract's artifacts and address in the frontend directory
  console.log("Exporting contract ABI to frontend...")
  saveFrontendFiles(rs);
}

function saveFrontendFiles(c: BaseContract) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
      path.join(contractsDir, "contract-address.json"),
      JSON.stringify({ Token: c.address, "chain_id": ethers.provider.network.chainId, "network_name": ethers.provider.network.name }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("RandomSwag");

  fs.writeFileSync(
      path.join(contractsDir, "RandomSwag.json"),
      JSON.stringify(TokenArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
