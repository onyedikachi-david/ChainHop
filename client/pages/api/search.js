const axios = require("axios");
require("dotenv").config();
const { ethers } = require("ethers");

const apiKey = process.env.NODEREAL_API_KEY;

const chainEndpoints = [
  {
    chain: "Binance Mainnet",
    url: `https://bsc-mainnet.nodereal.io/v1/${apiKey}`,
  },
  {
    chain: "Binance Testnet",
    url: `https://bsc-testnet.nodereal.io/v1/${apiKey}`,
  },
  {
    chain: "Ethereum Mainnet",
    url: `https://eth-mainnet.nodereal.io/v1/${apiKey}`,
  },
  {
    chain: "Goerli Testnet",
    url: `https://eth-goerli.nodereal.io/v1/${apiKey}`,
  },
  {
    chain: "Polygon",
    url: `https://polygon-mainnet.nodereal.io/v1/${apiKey}`,
  },
  {
    chain: "Optimism",
    url: `https://opt-mainnet.nodereal.io/v1/${apiKey}`,
  },
  {
    chain: "Avalanche-C",
    url: `https://open-platform.nodereal.io/${apiKey}/avalanche-c/ext/bc/C/rpc`,
  },
  {
    chain: "Arbitrum",
    url: `https://open-platform.nodereal.io/${apiKey}/arbitrum/`,
  },
  {
    chain: "Arbitrum-Nitro",
    url: `https://open-platform.nodereal.io/${apiKey}/arbitrum-nitro/`,
  },
  {
    chain: "Fantom",
    url: `https://open-platform.nodereal.io/${apiKey}/fantom/`,
  },
];

async function fetchTransactionReceipt(endpoint, hash) {
  const options = {
    method: "POST",
    url: endpoint.url,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    data: {
      id: 1,
      jsonrpc: "2.0",
      params: [hash],
      method: "eth_getTransactionReceipt",
    },
  };

  try {
    const response = await axios.post(options.url, options.data, {
      headers: options.headers,
    });
    return { chain: endpoint.chain, data: response.data };
  } catch (error) {
    console.error(`Error querying chain ${endpoint.chain}:`, error.message);
    throw error;
  }
}

function filterValidTransactions(transactions) {
  return transactions.filter(
    (transaction) => transaction.data.result !== null && !transaction.data.error
  );
}

export default async function handler(req, res) {
  const { hash } = req.query;

  try {
    const requests = chainEndpoints.map((endpoint) =>
      fetchTransactionReceipt(endpoint, hash)
    );

    const responses = await Promise.allSettled(requests);

    const results = responses
      .filter((response) => response.status === "fulfilled")
      .map((response) => response.value);

    const validTransactions = filterValidTransactions(results);

    console.log("Valid Transactions:", validTransactions);
    res.status(200).json(validTransactions);
  } catch (error) {
    console.error("Error during search:", error.message);
    res.status(500).json({ error: "An error occurred during the search" });
  }
}
