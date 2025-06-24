"use client"
import { useEffect, useState } from "react";
import * as React from "react";
import { useWriteContract, useWaitForTransactionReceipt, useConfig, useAccount } from "wagmi";
import { time_market_abi } from "@/constants";
import { readContract } from "@wagmi/core";

type TokenPageProps = {
  params: { token: string };
};

export default function TokenPage({ params }: TokenPageProps) {
  
  const [tradeAmount, setTradeAmount] = useState<string>("0");
  const [tokenData, setTokenData] = useState<any>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const { isLoading: isConfirming, isSuccess, isError } = useWaitForTransactionReceipt({ hash });  
  const config = useConfig();
  const account = useAccount();

  const DECIMALS = 10**18;

  useEffect(() => {

    const fetchTokenData = async () => {
      try {
        const response = await fetch(`http://192.168.0.101:8000/time_market_data/${params.token}`);
        const data = await response.json();

        setTokenData(data);
      } catch (error) {
        setTokenData(null);
      }
    };
    fetchTokenData();
  }, [params.token]);

  useEffect(() => {
    if (isConfirming && txHash) {
      setSuccessMsg("Transaction sent. Waiting for confirmation...");
    } else if (isSuccess && txHash) {
      setSuccessMsg(`Transaction confirmed! Hash: ${txHash}`);
    } else if (isError && txHash) {
      setSuccessMsg("Transaction failed or was reverted.");
    }
  }, [isConfirming, isSuccess, isError, txHash]);

  if (!tokenData || !tokenData.name) {
    return <div className="text-center text-red-500">Token not found.</div>;
  }

  async function buy(buy_amount: number) {
    try {
      setSuccessMsg("");
      const hash = await writeContractAsync({
        abi: time_market_abi,
        address: tokenData.address as `0x${string}`, 
        functionName: "buy",
        value: BigInt(parseFloat(tradeAmount) * DECIMALS)
      })
      setTxHash(hash);
      
    } catch (error) {
      setSuccessMsg(`Transaction failed. Error: ${error}`);
    }
  }

  async function getApprovedAmount(): Promise<number> {
    if(!tokenData.address) {
        alert("No address found for this chainid!");
    }        
    
    const response = await readContract(
        config,
        {
            abi: time_market_abi, 
            address: tokenData.address as `0x${string}`,
            functionName: "allowance",
            args:[account.address, tokenData.address as `0x${string}`]
        }
    )
    return response as number;

  } 
  
  async function sell(sell_amount: number) {
    const approvedAmount = await getApprovedAmount();
    const sellAmount = parseFloat(tradeAmount) * DECIMALS;

    if(approvedAmount < sell_amount) {
      try {
        await writeContractAsync({
          abi: time_market_abi,
          address: tokenData.address as `0x${string}`,
          functionName: "approve",
          args:[
            tokenData.address,
            BigInt(sellAmount)
          ]
        });
        setSuccessMsg("Approval successful. Proceeding with the sell transaction...");
      } catch(error) {
        console.log("Approval failed: ", error);
        setSuccessMsg(`Approval failed. Error: ${error}`);
      }
      }
    
    try {
      const hash = await writeContractAsync({
        abi: time_market_abi,
        address: tokenData.address as `0x${string}`,
        functionName: "sell",
        args:[
          BigInt(parseFloat(tradeAmount) * DECIMALS)
        ]
      });
      
      setTxHash(hash);
    } catch(error) {
      console.log("Sell transaction failed: ", error);
      setSuccessMsg(`Sell transaction failed. Error: ${error}`);
    }
  }


  return (
    <div className="bg-[#D2C4C4] min-h-screen flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl p-6">
        {/* Image Section */}
        <div className="flex-shrink-0 flex justify-center items-center w-full md:w-1/3">
          <img
            src={tokenData.image}
            alt={tokenData.name}
            className="rounded-lg object-cover w-full max-w-[300px]"
          />
        </div>

        {/* Content Section */}
        <div className="flex-grow mt-6 md:mt-0 md:ml-6">
          <h1 className="text-3xl font-bold text-gray-800">{tokenData.name}</h1>
          <p className="text-xl text-gray-600 mt-2">${tokenData.price} per minute</p>
          <p className="text-gray-700 mt-4">{tokenData.description}</p>

          {/* Interaction Section */}
          <div className="flex items-center mt-6">
            <label className="text-gray-600 mr-4">Minutes:</label>
            <input
              type="text"
              defaultValue={20}
              value={tradeAmount}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only valid decimal characters
                if (/^\d*\.?\d*$/.test(value) || value === "") {
                  setTradeAmount(value);
                }
              }}
              className="border border-gray-300 rounded px-3 py-2 w-30 text-center"
            />
            {successMsg && (
              <span className="ml-4 text-green-600 font-semibold max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap" title={successMsg}>
                {successMsg}
              </span>
            )}
          </div>
          <div className="flex mt-6 gap-4">
            <button onClick={() => buy(tradeAmount*DECIMALS)} className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition">
              Buy
            </button>
            <button onClick={() => sell(tradeAmount*DECIMALS)} className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition">
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
