import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// importing the consts used to store the address of the ethereum contract and the const for the contract ABI
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

// destructuring ethereum object 
const { ethereum } = window;

// getEthereumContract arrow function used to fetch the ethereum contract
const getEthereumContract = () => {
    // fetching and storing the provider
    const provider = new ethers.providers.Web3Provider(ethereum);
    // fetching and storing the signer
    const signer = provider.getSigner();
    // fetching contract by passing the contract address, the contract abi and the signer information
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
}


export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('')

    // async function used to check if wallet is connected
    const checkIfWalletIsConnected = async () => {
        // if their is no ethereum object return alert message
        if(!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({ method: 'eth_accounts'});

        console.log(accounts);
    }

    // async function used to connect meta mask wallet
    const connectWallet = async () => {
        // try catch block to make sure connection succeeds
        try {
            // checking if meta mask is installed
            if(!ethereum) return alert("Please install metamask");

            // request metamask account
            const accounts = await ethereum.request({ method: 'eth_requestAccounts'});

            // set the current account to the first meta mask account
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object.")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

 return (
    <TransactionContext.Provider value={{ connectWallet }}>
        {children}
    </TransactionContext.Provider>
    );
}