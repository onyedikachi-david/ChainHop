const axios = require("axios");
require("dotenv").config();
// Array of chain endpoints
const apiKey = process.env.NODEREAL_API_KEY;

const chainEndpoints = [
  `https://bsc-mainnet.nodereal.io/v1/${apiKey}`,
  `https://eth-mainnet.nodereal.io/v1/${apiKey}`,
  `https://polygon-mainnet.nodereal.io/v1/${apiKey}`,
];
// console.log(process.env);

// const options = {
//   method: "POST",
//   url: endpoint,
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json",
//   },
//   data: {
//     id: 1,
//     jsonrpc: "2.0",
//     params: [hash],
//     method: "eth_getTransactionReceipt",
//   },
// };

// const makeRequest = () => {
//   return new Promise((resolve, reject) => {
//     axios
//       .request(options)
//       .then(function (response) {
//         resolve(response);
//       })
//       .catch(function (error) {
//         reject(error);
//       });
//   });
// };

async function searchTransactionByHash(hash) {
  console.log("hash---->", hash);
  const results = [];

  // Perform search on each chain
  for (const endpoint of chainEndpoints) {
    try {
      // const options = {
      //   method: "POST",
      //   url: endpoint,
      //   headers: {
      //     accept: "application/json",
      //     "content-type": "application/json",
      //   },
      //   data: {
      //     id: 1,
      //     jsonrpc: "2.0",
      //     params: [hash],
      //     method: "eth_getTransactionReceipt",
      //   },
      // };

      // const makeRequest = () => {
      //   return new Promise((resolve, reject) => {
      //     axios
      //       .request(options)
      //       .then(function (response) {
      //         resolve(response);
      //       })
      //       .catch(function (error) {
      //         reject(error);
      //       });
      //   });
      // };
      // const response = null;
      const options = {
        method: "POST",
        url: endpoint,
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

      axios
        .request(options)
        .then(function (response) {
          response = response;
          // console.log(response.data);
        })
        .catch(function (error) {
          // console.error(error);
        });
      const response = await axios.post(options.url, options.data, {
        headers: options.headers,
      });
      // const response = await makeRequest();
      // console.log(response.data);
      const transactions = response.data;
      console.log("Hey ------> ", transactions);

      // Add valid results to the array
      if (transactions.result !== null) {
        results.push(transactions);
      }
      // if (Array.isArray(transactions) && transactions.length > 0) {
      //   console.log(transactions);
      //   results.push(
      //     ...transactions.map((transaction) => ({
      //       transactionId: transaction.id,
      //       chain: endpoint,
      //       // Add more transaction details as needed
      //     }))
      //   );
      // }
    } catch (error) {
      console.error(`Error querying chain ${endpoint}:`, error.message);
    }
  }

  return results;
}

export default async function handler(req, res) {
  const { hash } = req.query;

  try {
    const results = await searchTransactionByHash(hash);
    console.log("Result from ---> ", results);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error during search:", error.message);
    res.status(500).json({ error: "An error occurred during the search" });
  }
}
