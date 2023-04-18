# Oasis Consensus 2023 Swag picker

Random swag drawer/picker based on the user's Ethereum address.

Demo: https://matevz.github.io/oasisswag

To run backend tests locally:

```shell
yarn
yarn build
yarn test
```

To deploy backend on Sapphire Testnet and generate bindings for frontend:

```
yarn
yarn build
PRIVATE_KEY=0xYOUR_KEY_HERE npx hardhat run scripts/deploy.ts  --network sapphire_testnet
```

To run the frontend locally:

```
cd frontend
yarn
yarn start
```

Open http://localhost:3000 in your browser and enjoy!
