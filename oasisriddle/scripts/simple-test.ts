import { ethers } from "hardhat";
import { questions, answers, couponCodes, couponKeys } from "./data.json";

async function main() {
    const Riddle = await ethers.getContractFactory("Riddle");
//    const riddle = await Riddle.deploy(questions, answers, couponCodes, couponKeys);
//    await riddle.deployed();
    let riddle = new ethers.Contract("0xA62fbD0f3eC075DceB95f9D45939F987a1C93234", [
        "function getQuestion(string memory coupon) external view returns (string memory)",
        "function submitAnswer(string memory coupon, string memory answer) external",
        "function claimReward(string memory coupon) external view returns (string memory)",
    ], (await ethers.getSigners())[0]);

    console.log("Riddle deployed to ", riddle.address);

    await (await riddle.submitAnswer(couponCodes[0], answers[0])).wait();

    console.log("Reclaimed key: " + await riddle.claimReward(couponCodes[0]));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
