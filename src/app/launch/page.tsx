"use client";
import { useState } from "react";
import { useWriteContract, useAccount, useChainId } from "wagmi";
import { factory_abi } from "@/constants";
import { decodeEventLog, parseEventLogs } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import config from "@/RainbowKitConfig"

export default function LaunchPage() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [xHandle, setXHandle] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const account = useAccount(); // Get the current user's wallet address
  const chainid = useChainId()
  const { writeContractAsync } = useWriteContract();

  const createNewTimeMarket = async () => {
    try {
      setSuccessMsg("");
      setErrorMsg("");
      
      const userCheckResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${account.address}`);
      if(!userCheckResponse.ok) {
        // Step 1: Call the backend API route
        const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              wallet_address: account.address,
              name: name,
              x: xHandle,
            }),
          });
    
          if (!backendResponse.ok) {
            const backendError = await backendResponse.json();
            throw new Error(`Backend error: ${backendError.message}`);
          }
      }

      // Step 2: Interact with the factory contract
      const hash = await writeContractAsync({
        abi: factory_abi,
        address: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "createNewTimeMarket",
        args: [name, symbol],
      });

      const receipt = await waitForTransactionReceipt(config, { hash })
      const eventName = "NewTimeTokenCreated"
      const logs = parseEventLogs<typeof factory_abi>({
        abi: factory_abi,
        logs: receipt.logs,
        eventName: eventName
      });
      
      const log = logs[0] as any; 
      const contractAddress = log.args.timeToken; 

      console.log(`New deployed contract address: ${contractAddress}`);
      
      await new Promise((resolve) => setTimeout(resolve, 10000));
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${contractAddress}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageLink
        }),
      });
      setSuccessMsg(`Transaction sent! Hash: ${hash}`);
    } catch (error) {
      setErrorMsg(`Failed to create time market. Error: ${error}`);
    }
  };

  return (
    <div className="bg-[#D2C4C4] min-h-screen flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Create a New Time Market</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createNewTimeMarket();
          }}
          className="flex flex-col gap-4"
        >
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-600 font-medium mb-2">
              Token Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter token name"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>

          {/* Symbol Input */}
          <div>
            <label htmlFor="symbol" className="block text-gray-600 font-medium mb-2">
              Token Symbol
            </label>
            <input
              id="symbol"
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Enter token symbol"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>

          {/* Image Link Input */}
          <div>
            <label htmlFor="imageLink" className="block text-gray-600 font-medium mb-2">
              Image Link
            </label>
            <input
              id="imageLink"
              type="text"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="Enter image link"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>

          {/* X Handle Input */}
          <div>
            <label htmlFor="xHandle" className="block text-gray-600 font-medium mb-2">
              X Handle
            </label>
            <input
              id="xHandle"
              type="text"
              value={xHandle}
              onChange={(e) => setXHandle(e.target.value)}
              placeholder="Enter X handle"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Create Time Market
          </button>
        </form>

        {/* Success Message */}
        {successMsg && (
          <div className="mt-4 text-green-600 font-medium">
            {successMsg}
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-4 text-red-600 font-medium">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}