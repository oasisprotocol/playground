# Oasis Riddle

Developers at [Oasis Network][oasis-network] prepared a short riddle
that unlocks the path to a ROSE treasure. They hid it on the [Oasis Sapphire][oasis-explorer]
blockchain and your job now is to write a script that will connect to the
smart contract deployed on Sapphire and obtain
a secret question. If you manage to answer it correctly, 
you'll be able to collect your ROSE treasure! 🌹

## I like blockchains, but I'm not a skilled programmer and  I haven't really written any smart contracts yet

Don't worry! If you have some programming basics in Javascript, Python, C, or other programming languages, you have all the basics covered. You'll quickly learn everything else on the go 🎓

Generally, blockchains are not easy to understand and developing dApps has
some limitations compared to desktop or web apps. That is why one needs 
an open mind while also having understanding of the algorithms, 
data structures, writing efficient code, bug hunting skills, thorough
understanding of the programs from a cryptographic and security point of view, etc. 🤓

## OK. What do I need to do?

1. First, join our `#sapphire-paratime` channel on the official
   [Oasis Discord server][oasis-discord] so if you get stuck, you can ask for help.
   Even if you don't need help, stop by and say hi, everybody will be happy to meet you. 😉

2. If this is your first time developing a dApp, you can watch a 
   [short video on Ethereum smart contracts][ethereum-tutorial]. 💡

3. When you're ready to move further, check out our 
   [quickstart guide to Sapphire confidential smart contracs][oasis-sapphire-quickstart]. 💎

4. After you're done with both tutorials, it's time to solve the riddle! You can find it at
   `0xTODO` on [Oasis Sapphire Testnet][oasis-explorer-testnet]. 
   
   Use the following contract ABI:

```solidity
function getQuestion(string memory coupon) external view returns (string memory)
function submitAnswer(string memory coupon, string memory answer) external
function claimReward(string memory coupon) external view returns (string memory)
```

5. With the help of the newly obtained skills and tools, your task is to write a script
   that communicates with the riddle's smart contract. First, use a confidential call
   `getQuestion()` to get the secret questions tied to your unique ID. Then, create
   a secret answer and send it back with a confidential transaciton via 
   `submitAnswer()`. If the answer is correct, you'll be able to send a confidential 
   `claimReward()` call in the next block to obtain the private key 
   to your ROSE treasure on [Oasis Sapphire Mainnet][oasis-explorer]. 🎉

6. Congratulations, you've unlocked your ROSE treasure! You can now use your ROSE
   to create new dApps on Oasis and be among the first to utilize confidential smart contracts. 
   Or you can try to cash them in for a beer with your friends! 🍻

[oasis-network]: https://oasisprotocol.org
[oasis-discord]: https://oasis.io/discord
[ethereum-tutorial]: https://ethereum.org/en/developers/tutorials/hello-world-smart-contract-fullstack/
[oasis-sapphire-quickstart]: https://docs.oasis.io/dapp/sapphire/quickstart
[oasis-explorer-testnet]: https://testnet.explorer.sapphire.oasis.dev/
[oasis-explorer]: https://explorer.sapphire.oasis.io/
[bitcoin-map]: https://map.bitcoin.com
