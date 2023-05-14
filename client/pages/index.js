import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import React, { useState } from "react";
import { NavBar } from "../components";
import Layout from "../components/layout";
import axios from "axios";
import { ethers } from "ethers";
// import TransactionDetails from "../components/transactiondetails";
const TransactionDetails = ({ transaction }) => {
  // const { ... } = transaction;
  console.log("6.1---->", transaction[0].from);
  // console.log("6---->", from);
  const [activeTab, setActiveTab] = useState("details");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=" mx-auto max-w-max overflow-auto rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex">
        <div
          className={`mr-4 cursor-pointer ${
            activeTab === "details" ? "font-semibold" : ""
          }`}
          onClick={() => handleTabClick("details")}
        >
          Details
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "logs" ? "font-semibold" : ""
          }`}
          onClick={() => handleTabClick("logs")}
        >
          Logs
        </div>
      </div>
      {activeTab === "details" && (
        <>
          <h2 className="mb-4 text-lg font-semibold">Transaction Details</h2>
          <p className="mb-2">
            <span className="font-medium">From:</span> {transaction[0].from}
          </p>
          <p className="mb-2">
            <span className="font-medium">To:</span> {transaction[0].to}
          </p>
          <p className="mb-2">
            <span className="font-medium">Status:</span>{" "}
            {ethers.BigNumber.from(transaction[0].status).toNumber()
              ? "Success"
              : "Error"}
          </p>
          <p className="mb-2">
            <span className="font-medium">Contract Address:</span>{" "}
            {transaction[0].contractAddress || "N/A"}
          </p>
          <p className="mb-2">
            <span className="font-medium">Block Hash:</span>{" "}
            {transaction[0].blockHash}
          </p>
          <p className="mb-2">
            <span className="font-medium">Block Number:</span>{" "}
            {ethers.BigNumber.from(transaction[0].blockNumber).toNumber()}
          </p>

          <p className="mb-2">
            <span className="font-medium">Transaction Index:</span>{" "}
            {ethers.BigNumber.from(transaction[0].transactionIndex).toNumber()}
          </p>
          <p className="mb-2">
            <span className="font-medium">Effective Gas Price:</span>{" "}
            {ethers.BigNumber.from(transaction[0].effectiveGasPrice).toNumber()}
          </p>
        </>
      )}

      {activeTab === "logs" && (
        <>
          <h2 className="mb-4 text-lg font-semibold">Transaction Logs</h2>
          {/* Render logs */}
          {transaction[0].logs.map((log, index) => (
            <div key={index} className="mt-4 border-t pt-4">
              <p>
                <span className="font-semibold">Address:</span> {log.address}
              </p>
              <p>
                <span className="font-semibold">Topics:</span>{" "}
                {log.topics.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Data:</span> {log.data}
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
                <span className="font-semibold">Transaction Index:</span>{" "}
                {log.transactionIndex}
              </p>
              <p>
                <span className="font-semibold">Block Hash:</span>{" "}
                {log.blockHash}
              </p>
              <p>
                <span className="font-semibold">Log Index:</span> {log.logIndex}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default function Home() {
  const [hash, setHash] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chain, setChain] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/search?hash=${hash}`);
      const validTransactions = response.data;
      let myT = {};
      if (validTransactions && Array.isArray(validTransactions)) {
        console.log("1--->", validTransactions);
        setChain(validTransactions[0].chain);
        const transactionDataList = validTransactions.map((transaction) => {
          console.log("2----->", transaction.data);
          myT = transaction.data;

          return transaction.data.result;
        });
        // setTimeout(setResults([myT]), 10000);
        console.log("3---->", myT);
        console.log("3.1---->", transactionDataList);
        console.log("3---->", myT);
        setTimeout(setResults(transactionDataList), 10000);
        console.log("4---->", results);
      } else {
        setResults([]);
        console.log("No valid transactions found.");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
        {chain ? (
          <h1 className="mb-4 text-2xl font-bold text-white">
            Found on {chain} BlockChain
          </h1>
        ) : (
          <h1></h1>
        )}
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
          results.length > 0 && <TransactionDetails transaction={results} />
        )}{" "}
        {/* <ToastContainer /> */}
      </div>
      {/* </Layout> */}
    </div>
  );
}
