# ERC404 Builder | BNB Hackathon Submission 🚀

## Overview 🌐

Our innovative application facilitates no-code deployment of ERC404 token smart contracts on the BNB blockchain, enhancing the liquidity of NFTs by enabling them to be traded on both NFT marketplaces and decentralized exchanges. This user-friendly app allows for the creation of tokens without any coding requirements. Users simply input details such as token name, symbol, max supply, and base URI (containing the assets of the NFT collection) to deploy ERC404 token smart contracts with a single click. 🖱️

## Features 🛠️

- **No-Code Smart Contract Deployment:** Deploy ERC404 token smart contracts on the BNB blockchain effortlessly. 🧙‍♂️
- **Customizable Token Details:** Define token name, symbol, maximum supply, and base URI. ✍️
- **Integrated with Greenfield:** Utilize BNB's decentralized storage solution for generating base URI. 🌱
- **Token Minting:** Mint tokens, fractionalized or in whole amounts, until the total supply cap is reached. 🪙
- **Cross-Platform Trading:** Enables trading of minted tokens on exchanges and NFT marketplaces. 💱

## Tech Stack 💻

- **Frontend:** Next.js with Vite (viem.sh) and Wagmi for handling Web3 connections. 🖥️
- **Styling:** Tailwind CSS for intuitive, responsive design. 🎨
- **Smart Contracts:** Developed and tested using the Foundry framework. 🔧
- **Deployment:** Hosted on Vercel for seamless production deployments. 🚢
- **Language:** Written in TypeScript for type safety and developer efficiency. 📝

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Foundry](https://book.getfoundry.sh/getting-started/installation.html)

### Front-End

```bash
cd client && pnpm install
pnpm build
pnpm preview
```

- Check `client/` folder README for further details about usage and testing.

### Contracts

```bash
cd contracts && bun install
forge build
forge test
```

- Check `contracts/` folder README for further details about usage and testing.
- Deployments (Factory contract):
  - **BNB Chain Testnet** - [0x23DCB7ccceFEEd877f263c8467E3cEa87C67e4Ca](https://testnet.bscscan.com/address/0x23DCB7ccceFEEd877f263c8467E3cEa87C67e4Ca)
  - **opBNB Chain Testnet** - [0xb747e0671BF4531a01a9640C4Ad56805cD916e61](https://testnet.opbnbscan.com/address/0xb747e0671BF4531a01a9640C4Ad56805cD916e61)

## Usage 📝

- Navigate to the app's landing page and connect your wallet.
- Enter the required details for your ERC404 token (Name, Symbol, Max Supply, and Base URI).
- Select the chain you want the deployment to be performed (i.e. BNB or opBNB chains supported).
- Click on the "Deploy" button to create your smart contract.
- Upon successful deployment, proceed to dashboard and mint your tokens with the specified details.
- Trade your minted tokens both on decentralized exchanges and NFT marketplaces.

## Contributing 🤝

We welcome contributions to our project! If you have suggestions for improvements or encounter any issues, please open an issue or submit a pull request.

## License 📄

DeFi Builder © 2024 by DeFi Builder is licensed under CC BY-NC-SA 4.0. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
