import "./App.css";
import MintButton from "./components/MintButton";
import NFTList from "./components/NFTList";
import { useAccount, WagmiProvider } from 'wagmi'
import { config } from './config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ConnectWalletButton from "./components/ConnectWalletButton";
import { Account } from './account'
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import Modal from "./components/Modal";

const queryClient = new QueryClient()


function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <ConnectWalletButton />
}

function App() {
const [isOpen, setIsOpen] = useState(false);
const handleOpen = () => setIsOpen(!isOpen);
const handleClose = () => {return;}
  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
      <div>
      <div><Toaster/></div>
        <div className="navbar">
      <h2 className="navbar-title">Bloxima Technical Task</h2>
      <div className="navbar-item">
      <ConnectWallet />
      </div>
      </div>
      <button onClick={handleOpen}>Register To Ordinals Mint From Here</button>
      <Modal isOpen={isOpen} onClose={handleClose}>
      <RegisterForm />
      </Modal>
      <NFTList />
      <MintButton />
      </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
