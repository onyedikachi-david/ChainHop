import React from "react";

const TransactionDetails = ({ transaction }) => {
  const { from, to, blockNumber, transactionHash } = transaction.result;
  console.log("6---->", transactionHash);

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Transaction Details</h2>
      <p className="mb-2">
        <span className="font-medium">From:</span> {from}
      </p>
      <p className="mb-2">
        <span className="font-medium">To:</span> {to}
      </p>
      <p className="mb-2">
        <span className="font-medium">Block Number:</span> {blockNumber}
      </p>
      <p className="mb-2">
        <span className="font-medium">Transaction Hash:</span> {transactionHash}
      </p>
    </div>
  );
};

export default TransactionDetails;
