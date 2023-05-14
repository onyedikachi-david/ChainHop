import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import React, { useState } from "react";
import { NavBar } from "../components";
import Layout from "../components/layout";
import axios from "axios";

export default function Home() {
  const [hash, setHash] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/search?hash=${hash}`);
      setResults(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
      {/* <Layout> */}
      {/* <NavBar /> */}
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold text-white">
          MultiChain Explorer
        </h1>
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Enter transaction hash"
            className="mr-2 w-full rounded-l border p-2"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
          />
          <button
            className="rounded-r bg-blue-500 px-4 py-2 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {loading ? (
          <div className="text-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          results.length > 0 && (
            <div>
              {results.map((result) => (
                <div
                  key={result.id}
                  className="mb-4 rounded border p-4 text-teal-50"
                >
                  <h2 className="text-lg font-semibold">Transaction Details</h2>
                  <div className="mt-4 flex flex-col space-y-4 ">
                    <p>
                      <span className="font-semibold">Type:</span>{" "}
                      {result.result.type}
                    </p>
                    <p>
                      <span className="font-semibold">From:</span>{" "}
                      {result.result.from}
                    </p>
                    <p>
                      <span className="font-semibold">To:</span>{" "}
                      {result.result.to}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {result.result.status}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Cumulative Gas Used:
                      </span>{" "}
                      {result.result.cumulativeGasUsed}
                    </p>
                    <p>
                      {/* <span className="font-semibold">Logs Bloom:</span>{" "}
                      {result.result.logsBloom} */}
                    </p>
                    <div className="mt-4 rounded border p-4">
                      {/* <h3 className="text-lg font-semibold">Logs</h3>
                      {result.result.logs.map((log, index) => (
                        <div key={index} className="mt-4 border-t pt-4">
                          <p>
                            <span className="font-semibold">Address:</span>{" "}
                            {log.address}
                          </p>
                          <p>
                            <span className="font-semibold">Topics:</span>{" "}
                            {log.topics.join(", ")}
                          </p>
                          <p>
                            <span className="font-semibold">Data:</span>{" "}
                            {log.data}
                          </p>
                          <p>
                            <span className="font-semibold">Block Number:</span>{" "}
                            {log.blockNumber}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Transaction Hash: {log.transactionHash}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold">
                              Transaction Index:
                            </span>{" "}
                            {log.transactionIndex}
                          </p>
                          <p>
                            <span className="font-semibold">Block Hash:</span>{" "}
                            {log.blockHash}
                          </p>
                          <p>
                            <span className="font-semibold">Log Index:</span>{" "}
                            {log.logIndex}
                          </p>
                        </div>
                      ))} */}
                    </div>
                    <p>
                      <span className="font-semibold">Transaction Hash:</span>{" "}
                      {result.result.transactionHash}
                    </p>
                    <p>
                      <span className="font-semibold">Contract Address:</span>{" "}
                      {result.result.contractAddress || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Gas Used:</span>{" "}
                      {result.result.gasUsed}
                    </p>
                    <p>
                      <span className="font-semibold">Block Hash:</span>{" "}
                      {result.result.blockHash}
                    </p>
                    <p>
                      <span className="font-semibold">Block Number:</span>{" "}
                      {result.result.blockNumber}
                    </p>
                    <p>
                      <span className="font-semibold">Transaction Index:</span>{" "}
                      {result.result.transactionIndex}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Effective Gas Price:
                      </span>{" "}
                      {result.result.effectiveGasPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}{" "}
        {/* <ToastContainer /> */}
      </div>
      {/* </Layout> */}
    </div>
  );
}
