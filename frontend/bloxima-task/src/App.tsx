import "./App.css";
import MintButton from "./components/MintButton";
import NFTList from "./components/NFTList";
import { useAccount, WagmiProvider } from 'wagmi'
import { config } from './config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ConnectWalletButton from "./components/ConnectWalletButton";
import { Account } from './account'
import WalletOptions from "./components/ConnectWalletButton/WalletOptions";

const queryClient = new QueryClient()
function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

function App() {
  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
      <div>
        <div className="navbar">
      <h2 className="navbar-title">Bloxima Technical Task</h2>
      <div className="navbar-item">
      <ConnectWallet />
      </div>
      </div>
      <NFTList />
      <MintButton />
      </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
