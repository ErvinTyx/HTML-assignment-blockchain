# Gagamove Delivery DApp
This project is a decentralized application(DApp) for scheduling, tracking, modifying, and canceling delivery orders. The application integrates with MetaMask and utilizes the ether.js library for blockchain interactions.

---
# Overview
- [**Features**](#features)
- [**Installation**](#prerequisites)
- [**Functionalities**](#functionalities)
- [**Limitations**](#know-issues-and-limitations)
- [**Futher Improvement**](#future-enhacements)

---

## Features

1. **Connect Wallet:** 
   - Connects to the user's Ethereum wallet using Metamask.
   - Validates wallet connection and ensure the wallet is unlocked.

2. **Delivery Scheduling**
   - Allows users to schedule deliveries by specifying pickup and delivery locations, as well as a timelock for the delivery.
   - Dynamically calculates delivery costs in USD and ETH based on distance( 3 USD per km).

3. **Delivery Tracking**
   - Fetches real-time delivery details using the delivery ID.
   - Displays information such as user address, locations, price, and status.

4. **Delivery Modification**
   - Enables user to modify the delivery schedule if needed.
   - Fetches and validates existing delivery details.

5. **Owner and Contract Information**
   - Fetches and displays the smart contract owner's address for transparency.

## Prerequisites

Before you begin, ensure you have the following installed:
- [**Metamask** (browser extension)](https://metamask.io/download/)
- [**Backend Files**](https://github.com/ErvinTyx/Assignment-BlockChain.git)
- [**Vscode**](https://code.visualstudio.com/download)
- [**Live Server Extension**](#open-vsc-and-install-live-server)


## **Set Up**
1. Open metamask
![Open Meta Mask](https://github.com/ErvinTyx/HTML-assignment-blockchain/blob/9b303b514dabd49a52d147f38b4d6d9ee7f183ec/readme-img/openMetamask.png "Open Meta mask")

2. Select Network
![Selecting Network](https://github.com/ErvinTyx/HTML-assignment-blockchain/blob/9b303b514dabd49a52d147f38b4d6d9ee7f183ec/readme-img/openNetwork.png "Selecting Network")

3. Turn On testnet
![Turn On Testnet](https://github.com/ErvinTyx/HTML-assignment-blockchain/blob/9b303b514dabd49a52d147f38b4d6d9ee7f183ec/readme-img/openTestNetwork.png "Turn on Testnet")

4. Add a custom network
![Adding a custom network](https://github.com/ErvinTyx/HTML-assignment-blockchain/blob/main/readme-img/openTestNetwork.png "Adding a custom network")

5. Fill in information
![Fill in important information](https://github.com/ErvinTyx/HTML-assignment-blockchain/blob/main/readme-img/FillinNetwork.png "Fill in information")

   - **Network Name**: Gochain Testnet
   - **UR;**:`http://127.0.0.1:8545`
   - **Chain ID** :`31337`
   - **Symbol** :GO

6. To import some wallets with some Go eth
> ## ⚠⚠⚠Warning Do not use real money in this wallet ⚠⚠⚠
>The first wallet private key is defaulted to the contract owner address

![account information](https://github.com/ErvinTyx/HTML-assignment-blockchain/blob/9b303b514dabd49a52d147f38b4d6d9ee7f183ec/readme-img/anvil.png "you can see some private key import them")


7. Open Vsc and install Live Server
Open the project in vsc
```bash
cd <to-project-directory-is-located>
code .
```
Open extension ctrl+shift+x or click 
![Open Extension](https://github.com/ErvinTyx/HTML-assignment-blockchain/blob/9b303b514dabd49a52d147f38b4d6d9ee7f183ec/readme-img/openExtensionVsc.png)


![Search For Live Server](https://github.com/ErvinTyx/HTML-assignment-blockchain/blob/9b303b514dabd49a52d147f38b4d6d9ee7f183ec/readme-img/vscSeachForLiveSever.png)
click install

8. Run live Server
alt+o or alt+l or click go live at bottom right or open index.html right click `Open with live server`
![Click bottom right to run](https://github.com/ErvinTyx/HTML-assignment-blockchain/blob/9b303b514dabd49a52d147f38b4d6d9ee7f183ec/readme-img/goLiveVsc.png)




## Functionalities
1. Enter pickup and delivery locations.
2. Specify the delivery time(must be at least 2 hours in the future).
3. Review the calculated price(in USD and ETH).
4. Click **"Place Order"** to confirm and send the transaction to the blockchain.

### Track an Order:

1. Navigate to the **"Track Order"** section.
2. Enter the delivery ID and click **"Track Order"**.
3. View real-time delivery details.

### Modify an Order:

1. Navigate to the **"Modify Order"** section.
2. Enter the delivery ID to fetch existing details.
3. Specify the new schedule and click **"Update Schedule"**.

### Cancel an Order:

1. Navigate to the **"Cancel Order"** section.
2. Enter the delivery ID and click **"Cancel Order"**.

## Smart Contract Interaction

The DApp interacts with a smart contract deployed on the Ethereum blockchain. The contract's ABI and address are stored in `abi.js` , and `ethers.js` handles all blockchain communication.

### Smart Contract Functions Used:
- `scheduledDelivery`: Schedules a new delivery.
- `getDelivery`: Fetches delivery details.
- `modifyDelivery`: Modifies an existing delivery.
- `getOwner`: Retrieves the owner of the smart contract.

## Folder Structure

```plaintext
project/
├── index.html       # Main HTML file
├── admin.html       # Admin HTML file
├── index.css        # Stylesheet for the application
├── admin.css        # Admin Stylesheet
├── index.js         # Main JavaScript file for DApp logic
├── admin.js         # Admin JavaScript file for DApp logic
├── ethers.js        # Ethers.js integration
├── abi.js           # Smart contract ABI and address
└── README.md        # Documentation
```

## Know Issues and Limitations

- **MetaMask Compatibility** : Ensure Metamask is installed and the Ethereum network is properly selected.
- **Static Exchange Rate**: Currently, the ETH/USD exhange rate is hardcoded. Consider using a real-time API for dynamic updates.
- **Distance Calculation** :  For counting the distance, it is a random distance value, it lead to inaccurate route planning and delivery cost estimation.

## Future Enhacements

- Dynamic gas price estimation.
- Real-time ETH/USD price integration
- Improve UI/UX with loading indicators.
- Enhanced error handling for better user feedback.
- Distance count automatically for the system.
