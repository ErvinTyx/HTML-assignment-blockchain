export const contractAddress ="0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
export const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_priceFeed",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "DeliveryService__AlreadyCancelled"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "DeliveryService__AlreadyCancelledOrCompleted"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "DeliveryService__CancelDeliveryWrongState"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "DeliveryService__HaventFinishedScheduleTime"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "DeliveryService__NotInModifyState"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "DeliveryService__RefundFailed"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "DeliveryService__completeDeliveryWrongState"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "DeliveryService__deliveryDeliveryWrongState"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "address",
                "name": "customer",
                "type": "address",
                "indexed": true
            }
        ],
        "type": "event",
        "name": "DeliveryCancelled",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "address",
                "name": "customer",
                "type": "address",
                "indexed": true
            }
        ],
        "type": "event",
        "name": "DeliveryCompleted",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256",
                "indexed": false
            }
        ],
        "type": "event",
        "name": "DeliveryDelivered",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "newScheduledTime",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "remainingAttempts",
                "type": "uint256",
                "indexed": false
            }
        ],
        "type": "event",
        "name": "DeliveryModified",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "address",
                "name": "customer",
                "type": "address",
                "indexed": true
            },
            {
                "internalType": "string",
                "name": "fromAddress",
                "type": "string",
                "indexed": false
            },
            {
                "internalType": "string",
                "name": "toAddress",
                "type": "string",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "payAmount",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "scheduledTime",
                "type": "uint256",
                "indexed": false
            }
        ],
        "type": "event",
        "name": "DeliveryScheduled",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256",
                "indexed": false
            }
        ],
        "type": "event",
        "name": "OutForDelivery",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "cancelDelivery"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "completeDelivery"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "deliveredDelivery"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "deliveries",
        "outputs": [
            {
                "internalType": "address",
                "name": "customer",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "fromAddress",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "toAddress",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "payAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "scheduledTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "completedTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "modificationAttempts",
                "type": "uint256"
            },
            {
                "internalType": "enum DeliveryService.StatusDelivery",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "createdTime",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "pure",
        "type": "function",
        "name": "getCancellationLimit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "pure",
        "type": "function",
        "name": "getCoolingPeriod",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "getDelivery",
        "outputs": [
            {
                "internalType": "struct DeliveryService.Delivery",
                "name": "",
                "type": "tuple",
                "components": [
                    {
                        "internalType": "address",
                        "name": "customer",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "fromAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "toAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "payAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "scheduledTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "completedTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "modificationAttempts",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum DeliveryService.StatusDelivery",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "createdTime",
                        "type": "uint256"
                    }
                ]
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "pure",
        "type": "function",
        "name": "getMinimumDelay",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "pure",
        "type": "function",
        "name": "getModificationLimit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "getOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "getPriceFeed",
        "outputs": [
            {
                "internalType": "contract AggregatorV3Interface",
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "getVersion",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "isCoolingOff",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "lastCancellationTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "newScheduledTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "modifyDelivery"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deliveryID",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "outFordelivery"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "fromAddress",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "toAddress",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "scheduledTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function",
        "name": "scheduleDelivery",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "totalDeliveries",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "userCancellations",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "withdrawFunds"
    }
]