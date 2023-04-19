import React, {createContext, useContext, useState} from "react";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import {ethers} from "ethers";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import RandomSwagArtifact from "../contracts/RandomSwag.json";
import contractAddress from "../contracts/contract-address.json";

const isDevelopment = process.env.NODE_ENV !== 'production'

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const web3ProviderInitialState = {
  isMetamaskInstalled: undefined,
  isDevelopment,
  // The info of the token (i.e. It's Name and symbol)
  swagData: undefined,
  // The user's address and balance
  selectedAddress: undefined,
  swag: undefined,
  // The ID about transactions being sent, and any possible error with them
  txBeingSent: undefined,
  transactionError: undefined,
  networkError: undefined,
};

export const Web3Context = createContext(
  {}
);

export const Web3ContextProvider = ({children}) => {
  const [state, setState] = useState({
    ...web3ProviderInitialState,
  });

  const init = () => {
    if (window.ethereum === undefined) {
      setState(prevState => ({
        ...prevState,
        isMetamaskInstalled: false
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        isMetamaskInstalled: true
      }))
    }
  }

  const _checkNetwork = () => {
    if (window.ethereum.networkVersion.toString() === contractAddress.chain_id.toString()) {
      return true;
    }

    setState((prevState) => ({
      ...prevState,
      networkError: 'Please connect to Oasis Sapphire network'
    }));

    return false;
  }

  // The next two methods are needed to start and stop polling data. While
  // the data being polled here is specific to this example, you can use this
  // pattern to read any data from your contracts.
  //
  // Note that if you don't need it to update in near real time, you probably
  // don't need to poll it. If that's the case, you can just fetch it when you
  // initialize the app, as we do with the token data.
  const _startPollingData = () => {
    //_pollDataInterval = setInterval(() => _updateBalance(), 1000);

    // We run it once immediately so we don't have to wait for it
    _updateBalance();
  }

  const _stopPollingData = () => {
    clearInterval(state._pollDataInterval);
    setState((prevState) => ({
      ...prevState,
      _pollDataInterval: undefined
    }))
  }

  const _updateBalance = async () => {
//    const balance = await _token.balanceOf(state.selectedAddress);
//    setState({ swag });
  }

  // The next two methods just read from the contract and store the results
  // in the component state.
  const drawSwag = async () => {
    try {
      _dismissNetworkError()

      const s = await state._swagWrite.drawSwag();
      console.log(s);
      setState((prevState) => ({
        ...prevState, swag: {name: s[0], image: s[1]}
      }));
    } catch (e) {
      setState((prevState) => ({
        ...prevState, networkError: e.reason
      }));
    }
  }

  // This method sends an ethereum transaction to transfer tokens.
  // While this action is specific to this application, it illustrates how to
  // send a transaction.
  const _transferTokens = async (to, amount) => {
    // Sending a transaction is a complex operation:
    //   - The user can reject it
    //   - It can fail before reaching the ethereum network (i.e. if the user
    //     doesn't have ETH for paying for the tx's gas)
    //   - It has to be mined, so it isn't immediately confirmed.
    //     Note that some testing networks, like Hardhat Network, do mine
    //     transactions immediately, but your dapp should be prepared for
    //     other networks.
    //   - It can fail once mined.
    //
    // This method handles all of those things, so keep reading to learn how to
    // do it.

    try {
      // If a transaction fails, we save that error in the component's state.
      // We only save one such error, so before sending a second transaction, we
      // clear it.
      _dismissTransactionError();

      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      const tx = await state._swagWrite.transfer(to, amount);
      setState((prevState) => ({
        ...prevState, txBeingSent: tx.hash
      }));

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that made the transaction fail when it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }

      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      await _updateBalance();
    } catch (error) {
      // We check the error code to see if this error was produced because the
      // user rejected a tx. If that's the case, we do nothing.
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      // Other errors are logged and stored in the Dapp's state. This is used to
      // show them to the user, and for debugging.
      console.error(error);
      setState((prevState) => ({
        ...prevState, transactionError: error
      }));
    } finally {
      // If we leave the try/catch, we aren't sending a tx anymore, so we clear
      // this part of the state.
      setState((prevState) => ({
        ...prevState, txBeingSent: undefined
      }));
    }
  }

  // This method just clears part of the state.
  const _dismissTransactionError = () => {
    setState((prevState) => ({
      ...prevState, transactionError: undefined
    }));
  }

  // This method just clears part of the state.
  const _dismissNetworkError = () => {
    setState((prevState) => ({
      ...prevState, networkError: undefined
    }));
  }

  // This is an utility method that turns an RPC error into a human readable
  // message.
  const _getRpcErrorMessage = (error) => {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  // This method resets the state
  const _resetState = () => {
    setState(web3ProviderInitialState);
  }

  const _initializeEthers = async () => {
    // We first initialize ethers by creating a provider using window.ethereum
    const _provider = sapphire.wrap(new ethers.providers.Web3Provider(window.ethereum))

    // Then, we initialize two contract instances:
    // - _token: Used for query transactions (e.g. balanceOf, name, symbol)
    // - _tokenWrite: Used for on-chain write transactions (e.g. transfer)
    const _swag = new ethers.Contract(
      contractAddress.Token,
      RandomSwagArtifact.abi,
      _provider,
    )
    const _swagWrite = new ethers.Contract(
      contractAddress.Token,
      RandomSwagArtifact.abi,
      sapphire.wrap(new ethers.providers.Web3Provider(window.ethereum).getSigner())
    )

    setState(prevState => ({
      ...prevState,
      _provider,
      _swag,
      _swagWrite
    }))

    // Wait for the block to become finalized.
    await new Promise(r => setTimeout(r, 2000));

    const swagData = await _swag.dumpSwags();
    setState((prevState) => ({
      ...prevState, swagData
    }));
  }

  const _initialize = (userAddress) => {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    setState((prevState) => ({
      ...prevState,
      selectedAddress: userAddress,
    }));

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    _initializeEthers();
  }

  const connectWallet = async () => {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await window.ethereum.request({method: 'eth_requestAccounts'});

    // Once we have the address, we can initialize the application.

    // First we check the network
    if (!_checkNetwork()) {
      return;
    }

    await _initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      _stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state
      if (newAddress === undefined) {
        return _resetState();
      }

      _initialize(newAddress);
    });

    // We reset the dapp state if the network is changed
    window.ethereum.on("chainChanged", (/* [networkId] */) => {
      _stopPollingData();
      _resetState();
    });
  }

  const addSapphireNetworkToMetamask = () => {
    if (!window.ethereum?.request) {
      return alert('Have you installed MetaMask yet? If not, please do so.\n\nComputer: Once it is installed, you will be able to add the ParaTime to your MetaMask.\n\nPhone: Open the website through your MetaMask Browser to add the ParaTime.')
    }

    if (state.isDevelopment) {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x5aff',
          chainName: 'Oasis Sapphire Testnet',
          nativeCurrency: {name: 'TEST', symbol: 'TEST', decimals: 18,},
          rpcUrls: ['https://testnet.sapphire.oasis.dev/', 'wss://testnet.sapphire.oasis.dev/ws'],
          blockExplorerUrls: ['https://testnet.explorer.sapphire.oasis.dev'],
        },],
      })
    } else {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x5afe',
          chainName: 'Oasis Sapphire',
          nativeCurrency: {name: 'ROSE', symbol: 'ROSE', decimals: 18,},
          rpcUrls: ['https://sapphire.oasis.io/', 'wss://sapphire.oasis.io/ws'],
          blockExplorerUrls: ['https://explorer.sapphire.oasis.io'],
        },],
      })
    }
  }

  const providerState = {
    state,
    init,
    connectWallet,
    addSapphireNetworkToMetamask,
    drawSwag
  };

  return (
    <Web3Context.Provider value={providerState}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const value = useContext(Web3Context);
  if (value === undefined) {
    throw new Error("[useWeb3] Component not wrapped within a Provider");
  }
  return value;
};
