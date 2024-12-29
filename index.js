import { ethers } from "./ethers.js";
import { abi, contractAddress } from "./abi.js";

const connectButton = document.getElementById("connectWallet");
const getOwnerContract = document.getElementById("getOwner");
const placeOrder = document.getElementById("placeOrder");
const TrackOrder = document.getElementById("TrackOrder");
const modifyScheduleDelivery = document.getElementById("updateSchedule");
const cancelDelivery = document.getElementById("cancelDelivery");


const ETHER_TO_USD = 2000 * Math.pow(10, 16);
const StatusDelivery = {
    0: "Scheduled",
    1: "Cancelled",
    2: "Delivery",
    3: "DeliveryCompleted",
    4: "Completed"
};

connectButton.onclick = connect
getOwnerContract.onclick = getOwner
placeOrder.onclick = scheduleDelivery
TrackOrder.onclick = getDeliveryDetails
modifyScheduleDelivery.onclick = modifyDelivery
cancelDelivery.onclick = cancelOrder


async function cancelOrder() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const cancelId = document.getElementById("cancelOrderId").value;
        const errorMessage = document.getElementById('error-message-cancel');

        if (cancelId === "") {
            document.getElementById('currentScheduledTime-modify').value = '';
            errorMessage.style.display = 'none';
            alert("Please enter a order ID.");
            return;
        }
        try {
            const delivery = await contract.getDelivery(cancelId);
            // Check if the delivery exists
            if (delivery.customer === ethers.ZeroAddress) {
                console.log("No delivery found with the given ID.");
                document.getElementById('currentScheduledTime-modify').value = '';
                errorMessage.style.display = 'block';
            } else {
                // UI update
                errorMessage.style.display = 'none';
                // send transaction cancel delivery
                const tx = await contract.cancelDelivery(cancelId);
                const receipt = await tx.wait();
                const events = receipt.events;
                if (events && events.length > 0) {
                    const deliveryID = events[0].args.deliveryID;
                    const modificationAttemptsRemaining = events[0].args[2]; // access the third argument of the event
                    console.log("Delivery ID:", deliveryID);
                    console.log("Modification attempts remaining:", modificationAttemptsRemaining);
                    alert(`Your delivery ID is ${deliveryID}. Please use this ID to track your delivery.`);
                    console.log("Delivery cancelled successfully");
                }
            }

        } catch (error) {
            console.error("Error cancelling delivery:", error);
        }
    }
    else {
        console.log("Please install MetaMask");
        alert("Please install MetaMask");
        window.href("https://metamask.io/download/");
    }
}


async function modifyDelivery() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const modifyId = document.getElementById("modifyID").value;
        const scheduledTime = new Date(document.getElementById("currentScheduledTime-modify").value).getTime() / 1000;
        const newScheduledTime = new Date(document.getElementById("newScheduledTime").value).getTime() / 1000;

        if (modifyId === "") {
            alert("Please enter a valid order ID.");
            return;
        }

        // Get the current timestamp
        const nowTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds

        // Check if nowTimestamp is larger than scheduledTime
        if (nowTimestamp > scheduledTime) {
            alert("Cannot modify a delivery that has already been scheduled after the current time.");
            return;
        }

        // Calculate the difference in seconds
        let difference = newScheduledTime - nowTimestamp;


        if (difference < 7200) { // 2 hours in seconds
            alert("The selected time must be 2 hours or more in the future for delivery.");
            return;
        }

        try {
            const delivery = await contract.getDelivery(modifyId);
            if (delivery.customer === ethers.ZeroAddress) {
                console.log("No delivery found with the given ID.");
            } else {
                // send transaction
                const tx = await contract.modifyDelivery(modifyId, (difference + 28800));
                const receipt = await tx.wait();
                const events = receipt.events;
                if (events && events.length > 0) {
                    const deliveryID = events[0].args.deliveryID;
                    const modificationAttemptsRemaining = events[0].args[2]; // access the third argument of the event
                    console.log("Delivery ID:", deliveryID);
                    console.log("Modification attempts remaining:", modificationAttemptsRemaining);
                    alert(`Your delivery ID is ${deliveryID}. Please use this ID to track your delivery.`);
                    console.log("Delivery modified successfully");
                }
            }

        } catch (error) {
            console.error("Error modifying delivery:", error);
        }
    }
    else {
        console.log("Please install MetaMask");
        alert("Please install MetaMask");
        window.href("https://metamask.io/download/");
    }
}

async function getDeliveryDetails() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const idDelivery = document.getElementById("orderIdInput").value;

        if (!idDelivery) {
            alert("Please enter a valid order ID.");
            return;
        }
        try {
            const delivery = await contract.getDelivery(idDelivery);
            if (delivery.customer === ethers.ZeroAddress) {
                console.log("No delivery found with the given ID.");
                return;
            }
            // console.log("Delivery Details:");
            // console.log("Customer:", delivery.customer);
            // console.log("From Address:", delivery.fromAddress);
            // console.log("To Address:", delivery.toAddress);
            // console.log("Paid Amount:", ethers.formatEther(delivery.payAmount), "ETH");
            // console.log("Scheduled Time:", new Date(Number(delivery.scheduledTime) * 1000).toLocaleString());
            // console.log("Completed Time:",
            //     delivery.completedTime > 0 ? new Date(Number(delivery.completedTime) * 1000).toLocaleString() : "Not completed yet");
            // console.log("Modification Attempts:", Number(delivery.modificationAttempts));
            // console.log("Status:", StatusDelivery[delivery.status]);
            // Update the HTML elements

            document.getElementById("userAddress-track").textContent = delivery.customer;
            document.getElementById("fromLocation-track").textContent = delivery.fromAddress;
            document.getElementById("toLocation-track").textContent = delivery.toAddress;
            document.getElementById("price-track").textContent = ethers.formatUnits(delivery.payAmount, "ether");
            document.getElementById("status-track").textContent = StatusDelivery[delivery.status];
        } catch (error) {
            console.error("Error fetching delivery details:", error);
        }
    } else {
        console.log("Please install MetaMask");
    }
}

async function scheduleDelivery() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const fromAddress = document.getElementById("fromLocation").value;
        const toAddress = document.getElementById("toLocation").value;
        const price = parseFloat(document.getElementById("USDprice").value) * Math.pow(10, 6);
        const scheduledTime = new Date(document.getElementById("timeLock").value).getTime() / 1000; // Convert datetime-local to unix timestamp

        // Ensure the input is not empty
        if (!scheduledTime || fromAddress === "" || toAddress === "") {
            alert("Please enter all required fields.");
            return;
        }

        // Get the current timestamp
        const nowTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds

        // Calculate the difference in seconds
        let difference = scheduledTime - nowTimestamp;

        if (difference < 7200) { // 2 hours in seconds
            alert("The selected time must be 2 hours or more in the future for delivery.");
            return;
        }

        try {
            // Call the smart contract function
            const tx = await contract.scheduleDelivery(fromAddress, toAddress, price, (difference + 28800), {
                value: ethers.parseEther(document.getElementById("ETHprice").value)
            });
            const receipt = await tx.wait();
            const events = receipt.events;

            if (events && events.length > 0) {
                const deliveryID = events[0].args.deliveryID;
                console.log("Delivery ID:", deliveryID);
                alert(`Your delivery ID is ${deliveryID}. Please use this ID to track your delivery.`);
                console.log("Delivery scheduled successfully");
            } else {
                console.error("No events found in transaction receipt");
            }

        } catch (error) {
            console.error("Error scheduling delivery:", error);
        }
    } else {
        alert("Please connect to Metamask");
        window.location.href = "https://metamask.io/download/";
    }
}


async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
            console.log("connected");
            const isUnlocked = await window.ethereum._metamask.isUnlocked();
            if (!isUnlocked) {
                alert("Please unlock Metamask");
            }
        } catch (error) {
            console.log(error);
        }
        connectButton.innerHTML = "Connected";
        setupEventListeners();
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
            console.log("Connected address:", accounts[0]);
        } else {
            console.log("Please connect to Metamask");
            alert("Please connect to Metamask");
        }
    } else {
        alert("Metamask is not installed");
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

const setupEventListeners = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const deliveryItem = document.getElementById("delivery-item");
    const deliveryContent = document.getElementById("delivery-content");


    contract.on("DeliveryScheduled", (deliveryID, sender, fromAddress, toAddress, price, value, scheduledTime) => {
        if (!deliveryItem || !deliveryContent) {
            console.error("deliveryItem or deliveryContent is not defined");
            return;
        }

        deliveryItem.style.display = "block";
        console.log(`Delivery Scheduled: 
            ID: ${deliveryID}, 
            Sender: ${sender}, 
            From: ${fromAddress}, 
            To: ${toAddress}, 
            Price: ${price}, 
            Value: ${value}, 
            Scheduled Time: ${scheduledTime}`);

        console.log("Start");
        try {


            deliveryContent.innerHTML = `
            <h1>Completed Payment</h1><p class="highlight">Delivery ID: ${Number(deliveryID)}</p>
            <p>Wallet: ${sender}</p>
            <p>From: ${fromAddress}</p>
            <p>To: ${toAddress}</p>
            <p>Price(ETH): $${ethers.formatEther(value)}</p>
            <button id="close-overlay">OK</button>
            `;

            const closeButton = document.getElementById("close-overlay");
            if (closeButton) {
                closeButton.addEventListener("click", () => {
                    deliveryItem.style.display = "none";
                });
            } else {
                console.error("Close button not found");
            }

            console.log("End");
        } catch (error) {
            console.error("Error fetching delivery details:", error);
        }
    });


    contract.on("DeliveryCancelled", (deliveryID) => {
        console.log(`Delivery Cancelled: 
            ID: ${deliveryID}`);
        const deliveryItem = document.getElementById("delivery-item");
        const deliveryContent = document.getElementById("delivery-content");
        deliveryItem.style.display = "block";
        deliveryContent.innerHTML = `<h1>Delivery Cancelled</h1><p class="highlight">Delivery ID: ${Number(deliveryID)}</p><button id="close-overlay">OK</button>`;
        const closeButton = document.getElementById("close-overlay");
        if (closeButton) {
            closeButton.addEventListener("click", () => {
                deliveryItem.style.display = "none";
            });
        } else {
            console.error("Close button not found");
        }
    });

    contract.on("DeliveryModified", (deliveryID, newScheduledTime, remainingAttempts) => {
        console.log(`Delivery Modified: 
            ID: ${deliveryID}, 
            New Scheduled Time: ${newScheduledTime}, 
            Remaining Attempts: ${remainingAttempts}`);
        const deliveryItem = document.getElementById("delivery-item");
        const deliveryContent = document.getElementById("delivery-content");
        deliveryItem.style.display = "block";
        deliveryContent.innerHTML = `<h1>Delivery Modified</h1><p class="highlight">Delivery ID: ${Number(deliveryID)}</p><p>Remaining Attempts: ${remainingAttempts}</p><button id="close-overlay">OK</button>`;
        const closeButton = document.getElementById("close-overlay");
        if (closeButton) {
            closeButton.addEventListener("click", () => {
                deliveryItem.style.display = "none";
            });
        } else {
            console.error("Close button not found");
        }
    });

    


}
document.addEventListener("DOMContentLoaded", () => {
    const fromLocationInput = document.getElementById("fromLocation");
    const toLocationInput = document.getElementById("toLocation");
    const modifyDelivery = document.getElementById("modifyID");
    const cancelDelivery = document.getElementById("cancelOrderId");
    const tackDelivery = document.getElementById("orderIdInput");


    function generateRandomDistance() {
        return Math.floor(Math.random() * 50) + 1; // Random distance between 1 and 50 km
    }

    function usdToEther(usdAmount) {
        if (usdAmount <= 0) {
            throw new Error("Amount in USD must be greater than zero.");
        }

        // Calculate Ether from USD
        const etherAmount = usdAmount * Math.pow(10, 16) / ETHER_TO_USD;
        return etherAmount;
    }

    function checkInputsAndGenerateDistance() {
        const fromLocation = fromLocationInput.value.trim();
        const toLocation = toLocationInput.value.trim();

        if (fromLocation && toLocation) {
            const distance = generateRandomDistance();
            // console.log(`The distance between "${fromLocation}" and "${toLocation}" is ${distance} km.`);
            document.getElementById("distancegen").value = distance;
            getPrice();
        }
    }

    function getPrice() {
        const distance = document.getElementById("distancegen").value;
        const priceETH = usdToEther(distance * 3);
        const priceUSD = distance * 3;
        // console.log(priceETH);
        // console.log(distance*3);
        document.getElementById("USDprice").value = priceUSD;
        document.getElementById("ETHprice").value = priceETH;
    }

    async function getCurrentTime() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            const modifyId = document.getElementById("modifyID").value;
            const errorMessage = document.getElementById('error-message');

            if (modifyId === "") {
                document.getElementById('currentScheduledTime-modify').value = '';
                errorMessage.style.display = 'none';
                return;
            }
            try {
                const delivery = await contract.getDelivery(modifyId);
                // Check if the delivery exists
                if (delivery.customer === ethers.ZeroAddress) {
                    console.log("No delivery found with the given ID.");
                    document.getElementById('currentScheduledTime-modify').value = '';
                    errorMessage.style.display = 'block';
                } else {
                    // UI update
                    const scheduledTime = Number(delivery.scheduledTime);
                    document.getElementById("currentScheduledTime-modify").value = new Date(scheduledTime * 1000).toISOString().slice(0, 16);
                    errorMessage.style.display = 'none';
                }

            } catch (error) {
                console.error("Error modifying delivery:", error);
            }
        }
        else {
            console.log("Please install MetaMask");
            alert("Please install MetaMask");
            window.href("https://metamask.io/download/");
        }
    }

    async function tackDeliveryFound() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            const cancelId = document.getElementById("orderIdInput").value;
            const errorMessage = document.getElementById('error-message-track');

            if (cancelId === "") {
                document.getElementById('currentScheduledTime-modify').value = '';
                errorMessage.style.display = 'none';
                return;
            }
            try {
                const delivery = await contract.getDelivery(cancelId);
                // Check if the delivery exists
                if (delivery.customer === ethers.ZeroAddress) {
                    console.log("No delivery found with the given ID.");
                    document.getElementById('currentScheduledTime-modify').value = '';
                    errorMessage.style.display = 'block';
                } else {
                    // UI update
                    errorMessage.style.display = 'none';
                }
            } catch (error) {
                console.error("Error cancelling delivery:", error);
            }
        }
        else {
            console.log("Please install MetaMask");
            alert("Please install MetaMask");
            window.href("https://metamask.io/download/");
        }
    }
    async function cancelOrder() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            const cancelId = document.getElementById("cancelOrderId").value;
            const errorMessage = document.getElementById('error-message-cancel');

            if (cancelId === "") {
                document.getElementById('currentScheduledTime-modify').value = '';
                errorMessage.style.display = 'none';
                return;
            }
            try {
                const delivery = await contract.getDelivery(cancelId);
                // Check if the delivery exists
                if (delivery.customer === ethers.ZeroAddress) {
                    console.log("No delivery found with the given ID.");
                    document.getElementById('currentScheduledTime-modify').value = '';
                    errorMessage.style.display = 'block';
                } else {
                    // UI update
                    errorMessage.style.display = 'none';
                }

            } catch (error) {
                console.error("Error cancelling delivery:", error);
            }
        }
        else {
            console.log("Please install MetaMask");
            alert("Please install MetaMask");
            window.href("https://metamask.io/download/");
        }
    }

    fromLocationInput.addEventListener("input", checkInputsAndGenerateDistance);
    toLocationInput.addEventListener("input", checkInputsAndGenerateDistance);
    modifyDelivery.addEventListener("input", getCurrentTime);
    cancelDelivery.addEventListener("input", cancelOrder);
    tackDelivery.addEventListener("input", tackDeliveryFound);
});