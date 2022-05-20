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
    const [currentAccount, setCurrentAccount] = useState('')
    // creating formData states and setting to empty strings
    const [formData, setformData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });

    // handleChange function that takes e parameter keypress event and name
    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
      };

    // async function used to check if wallet is connected
    const checkIfWalletIsConnected = async () => {
        try {
                // if their is no ethereum object return alert message
                if(!ethereum) return alert("Please install metamask");

                const accounts = await ethereum.request({ method: 'eth_accounts'});
        
                // check if their is an account
                if(accounts.length) {
                    // this will make it so account is accesbile at the start of every render by setting it
                    setCurrentAccount(accounts[0]);
        
                    // get all the transactions
                } else {
                    console.log('No accounts found');
                }
            
        } catch (error) {
            // log error 
            console.log(error);

            // throw new error message
            throw new Error("No Ethereum object.")
        }
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

    // async arrow function for sending transactions
    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");

             // destrcuture the formData properties
            const { addressTo, amount, keyword, message } = formData;

            getEthereumContract();

        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object.")
        }
    }

    // calling checkIfWalletIsConnected function
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

 return (
     // passing connectWallet and currentAccount through context and others
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setformData, handleChange, sendTransaction }}>
        {children}
    </TransactionContext.Provider>
    );
}