import { ethers } from "hardhat";
//import { questions, answers, couponCodes, couponKeys } from "./data.json";

async function main() {
    const addr="0x4874c1EC02c122Dfb29C994264dFCC4aD9FA8b96";
    const Riddle = await ethers.getContractFactory("Riddle");
    let riddle = new ethers.Contract(addr, [
        "function countCoupons() external view returns (uint, uint)",
    ], (await ethers.getSigners())[0]);

    console.log("Riddle deployed to ", riddle.address);
    console.log("Coupons statistics: " + await riddle.countCoupons());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
