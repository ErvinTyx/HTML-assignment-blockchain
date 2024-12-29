import { ethers } from "./ethers.js";
import { abi, contractAddress } from "./abi.js";

const connectButton = document.getElementById("connectWallet");
const getOwnerContract = document.getElementById("getOwner");
connectButton.onclick = connect
getOwnerContract.onclick = getOwner


const adminAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Admin address

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected to MetaMask");

            const isUnlocked = await window.ethereum._metamask.isUnlocked();
            if (!isUnlocked) {
                alert("Please unlock MetaMask");
            }

            connectButton.innerHTML = "Connected";

            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                const connectedAddress = accounts[0];
                console.log("Connected address:", connectedAddress);

                // Check if the connected address matches the admin address
                if (connectedAddress.toLowerCase() !== adminAddress.toLowerCase()) {
                    alert("You are not connected to the admin account.");
                    // Optionally, redirect or take other actions
                    window.location.href = "index.html"; // Redirect to user page or another action
                } else {
                    console.log("Admin account connected");
                }
            } else {
                console.log("Please connect to MetaMask");
                alert("Please connect to MetaMask");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        alert("MetaMask is not installed");
        window.location.href = "https://metamask.io/download/";
    }
}


async function getOwner() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        try {
            // Call the smart contract function
            const owner = await contract.getOwner();
            console.log("Owner address:", owner);

            // Update the HTML element with the owner's address
            const getOwnerContract = document.getElementById("getOwner");
            if (getOwnerContract) {
                getOwnerContract.innerHTML = "Connected Contract";
            }
        } catch (error) {
            console.error("Error fetching owner:", error);
        }
    } else {
        alert("Please connect to Metamask");
        window.location.href = "https://metamask.io/download/";
    }
}


// Toast notifications
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Handle account change
function handleAccountChange(accounts) {
    if (accounts.length === 0) {
        alert('MetaMask is disconnected. Please connect again.');
        disableActions();
    } else {
        account = accounts[0];
        connectWallet();
    }
}

// Add event listener to the "Connect Wallet" button
document.querySelector('.nav-wallet').addEventListener('click', connectWallet);
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed.");

    // Get references to the buttons and the input field
    const startDeliveryBtn = document.getElementById("startDeliveryBtn");
    const completeDeliveryBtn = document.getElementById("completeDeliveryBtn");
    const deliveryIDElement = document.getElementById("deliveryId"); // Ensure the correct ID

    // Debugging: Check if elements are found
    console.log("Start Delivery Button: ", startDeliveryBtn);
    console.log("Complete Delivery Button: ", completeDeliveryBtn);
    console.log("Delivery ID Input: ", deliveryIDElement);

    // Check if the input field exists
    if (!deliveryIDElement) {
        console.error("Delivery ID input field not found.");
        return;
    }

    // Attach event listeners to the buttons
    if (startDeliveryBtn && completeDeliveryBtn) {
        startDeliveryBtn.addEventListener("click", markDelivering);
        completeDeliveryBtn.addEventListener("click", markDelivered);
        console.log("Event listeners are attached to buttons.");
    } else {
        console.error("Buttons are not available.");
    }
});

// Function to mark delivery as "Delivering"
async function markDelivering() {
    const deliveryIDElement = document.getElementById("deliveryId");

    if (!deliveryIDElement) {
        alert("Delivery ID input field not found.");
        return;
    }

    const deliveryID = deliveryIDElement.value;

    if (!deliveryID) {
        alert("Please enter a valid Delivery ID.");
        return;
    }

    // Pop-up alert for starting the delivery
    alert(`Starting delivery for ID: ${deliveryID}`);

    // Debugging: Log the entered delivery ID
    console.log("Starting delivery for ID:", deliveryID);

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);

        try {
            // Fetch the delivery details
            const delivery = await contract.getDelivery(deliveryID);
            if (delivery.customer === ethers.ZeroAddress) {
                alert("No delivery found with the given ID.");
                return;
            }

            // Set status to "Delivering"
            const deliveryStatus = "Delivering";

            // Display delivery details with updated status
            document.getElementById("userAddress-track").textContent = delivery.customer;
            document.getElementById("fromLocation-track").textContent = delivery.fromAddress;
            document.getElementById("toLocation-track").textContent = delivery.toAddress;
            document.getElementById("price-track").textContent = ethers.formatUnits(delivery.payAmount, "ether");
            document.getElementById("status-track").textContent = deliveryStatus;

        } catch (error) {
            console.error("Error fetching delivery details:", error);
            alert("Failed to fetch delivery details. Check console for errors.");
        }
    } else {
        alert("Please install MetaMask to interact with this feature.");
    }
}

// Function to mark delivery as "Completed"
async function markDelivered() {
    const deliveryIDElement = document.getElementById("deliveryId");

    if (!deliveryIDElement) {
        alert("Delivery ID input field not found.");
        return;
    }

    const deliveryID = deliveryIDElement.value;

    if (!deliveryID) {
        alert("Please enter a valid Delivery ID.");
        return;
    }

    // Pop-up alert for completing the delivery
    alert(`Completing delivery for ID: ${deliveryID}`);

    // Debugging: Log the entered delivery ID
    console.log("Completing delivery for ID:", deliveryID);

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);

        try {
            // Fetch the delivery details
            const delivery = await contract.getDelivery(deliveryID);
            if (delivery.customer === ethers.ZeroAddress) {
                alert("No delivery found with the given ID.");
                return;
            }

            // Set status to "Completed"
            const deliveryStatus = "Completed";

            // Display delivery details with updated status
            document.getElementById("userAddress-track").textContent = delivery.customer;
            document.getElementById("fromLocation-track").textContent = delivery.fromAddress;
            document.getElementById("toLocation-track").textContent = delivery.toAddress;
            document.getElementById("price-track").textContent = ethers.formatUnits(delivery.payAmount, "ether");
            document.getElementById("status-track").textContent = deliveryStatus;

        } catch (error) {
            console.error("Error fetching delivery details:", error);
            alert("Failed to fetch delivery details. Check console for errors.");
        }
    } else {
        alert("Please install MetaMask to interact with this feature.");
    }
}

// Function to view delivery details
document.getElementById("viewDetailsBtn").addEventListener("click", async () => {
    const deliveryId = document.getElementById("deliveryId").value;

    if (!deliveryId) {
        alert("Please enter a valid Delivery ID.");
        return;
    }

    alert("Fetching details for Delivery ID: " + deliveryId);

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);

        try {
            const delivery = await contract.getDelivery(deliveryId);
            if (delivery.customer === ethers.ZeroAddress) {
                alert("No delivery found with the given ID.");
                return;
            }

            // Set status to "Pending" if it's empty or undefined
            const deliveryStatus = delivery.status ? StatusDelivery[delivery.status] : "Pending";

            // Display delivery details
            document.getElementById("userAddress-track").textContent = delivery.customer;
            document.getElementById("fromLocation-track").textContent = delivery.fromAddress;
            document.getElementById("toLocation-track").textContent = delivery.toAddress;
            document.getElementById("price-track").textContent = ethers.formatUnits(delivery.payAmount, "ether");
            document.getElementById("status-track").textContent = deliveryStatus;

        } catch (error) {
            console.error("Error fetching delivery details:", error);
            alert("Failed to fetch delivery details. Check console for errors.");
        }
    } else {
        alert("Please install MetaMask to interact with this feature.");
    }
});


