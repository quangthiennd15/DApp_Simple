import logo from './logo.svg';
import './App.css';



import React, { useState } from 'react';
import Web3 from 'web3';

function Transfer() {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setConnected(true);
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        const account = accounts[0];
        setAccount(account)
        setBalance(balance);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const transfer = async () => {
    if (connected) {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const tx = await web3.eth.sendTransaction({
        to: recipient,
        value: web3.utils.toWei(amount, 'ether'),
        from: accounts[0],
      });
      console.log(tx);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>DAPP SIMPLE</h1>
      </header>
      {!connected ? (
        <button onClick={connectToMetaMask}>Connect to MetaMask</button>
      ) : (
        <>
          <p>Account: {account}</p>
          <p>Balance: {balance} ETH</p>
          <input
            type="text"
            placeholder="Recipient Address"
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={transfer}>Transfer</button>
        </>
      )}
    </div>
  );
}

export default Transfer;
