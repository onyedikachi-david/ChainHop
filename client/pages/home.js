import React from "react";
import { useState } from "react";
import axios from "axios";

function Home() {
  const [hash, setHash] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/search?hash=${hash}`);
      console.log(response.data);
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">MultiChain Explorer</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter transaction hash"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          className="mr-2 w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-bold">Search Results:</h2>
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="rounded border border-gray-300 p-4">
                <div className="mb-2 font-bold">
                  Transaction ID: {result.hash}
                </div>
                <div className="flex flex-wrap">
                  <div className="w-1/2">
                    <div className="font-bold">Block Number:</div>
                    <div>{result.blockNumber}</div>
                    <div className="font-bold">From:</div>
                    <div>{result.from}</div>
                    <div className="font-bold">Gas:</div>
                    <div>{result.gas}</div>
                    <div className="font-bold">Gas Price:</div>
                    <div>{result.gasPrice}</div>
                    <div className="font-bold">Nonce:</div>
                    <div>{result.nonce}</div>
                  </div>
                  <div className="w-1/2">
                    <div className="font-bold">To:</div>
                    <div>{result.to}</div>
                    <div className="font-bold">Transaction Index:</div>
                    <div>{result.transactionIndex}</div>
                    <div className="font-bold">Value:</div>
                    <div>{result.value}</div>
                    <div className="font-bold">Type:</div>
                    <div>{result.type}</div>
                    <div className="font-bold">V:</div>
                    <div>{result.v}</div>
                    <div className="font-bold">R:</div>
                    <div>{result.r}</div>
                    <div className="font-bold">S:</div>
                    <div>{result.s}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
