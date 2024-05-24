const contractAddress = "0x6CEd78Cef18cC9796AE6a7763B41fa7661E96428"; 
const contractABI = [
    
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "crypto",
                "type": "string"
            }
        ],
        "name": "CryptoChosen",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "Recasted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "crypto",
                "type": "string"
            }
        ],
        "name": "chooseCrypto",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "recast",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getCrypto",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let web3;
let contract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            contract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    generateFallingTokens();
});

async function recast() {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    await contract.methods.recast().send({ from: userAddress });

    document.getElementById('find-crypto-button').disabled = false;
    alert('Recast completed! You can now find out your crypto.');
}

async function findCrypto() {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    const cryptoData = [
        { name: "Bitcoin", image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
        { name: "Ethereum", image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
        { name: "Litecoin", image: "https://assets.coingecko.com/coins/images/2/small/litecoin.png" },
        { name: "Polkadot", image: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png" },
        { name: "Cardano", image: "https://assets.coingecko.com/coins/images/975/small/cardano.png" },
        { name: "Ripple", image: "https://assets.coingecko.com/coins/images/44/small/ripple.png" },
        { name: "Chainlink", image: "https://assets.coingecko.com/coins/images/877/small/chainlink.png" },
        { name: "Stellar", image: "https://assets.coingecko.com/coins/images/100/small/stellar.png" },
        { name: "Dogecoin", image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png" },
        { name: "Aave", image: "https://assets.coingecko.com/coins/images/12645/small/aave.png" },
        { name: "Uniswap", image: "https://assets.coingecko.com/coins/images/12504/small/uniswap.png" },
        { name: "Solana", image: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
        { name: "Avalanche", image: "https://assets.coingecko.com/coins/images/12559/small/avalanche.png" },
        { name: "Cosmos", image: "https://assets.coingecko.com/coins/images/1481/small/cosmos.png" },
        { name: "Terra", image: "https://assets.coingecko.com/coins/images/8282/small/terra.png" },
        { name: "VeChain", image: "https://assets.coingecko.com/coins/images/526/small/vechain.png" },
        { name: "Shiba Inu", image: "https://assets.coingecko.com/coins/images/11939/small/shiba_inu.png" },
        { name: "Theta", image: "https://assets.coingecko.com/coins/images/2538/small/theta-token-logo.png" },
        { name: "Tron", image: "https://assets.coingecko.com/coins/images/1094/small/tron-logo.png" },
        { name: "Monero", image: "https://assets.coingecko.com/coins/images/69/small/monero_logo.png" },
        { name: "Zcash", image: "https://assets.coingecko.com/coins/images/486/small/zcash.png" },
        // Добавьте сюда больше криптовалют
    ];

    const randomIndex = Math.floor(Math.random() * cryptoData.length);
    const chosenCrypto = cryptoData[randomIndex].name;
    const cryptoImage = cryptoData[randomIndex].image;

    await contract.methods.chooseCrypto(chosenCrypto).send({ from: userAddress });

    document.getElementById('crypto-result').innerText = `You are ${chosenCrypto}!`;
    document.getElementById('crypto-image').src = cryptoImage;
   
