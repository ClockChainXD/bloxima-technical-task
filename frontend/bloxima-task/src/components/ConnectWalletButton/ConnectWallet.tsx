import { Connector, useConnect } from 'wagmi'
import styles from './ConnectWalletButton.module.css'

export  function handleConnect(connectors: readonly Connector[]){

    return connectors.map((connector) => {
        connector.connect({chainId: 17000})

    })
}

export const ConnectWallet = () =>{
    const { connectors } = useConnect()


    return (
            <button className={styles.button}onClick={() => handleConnect(connectors)}>Connect Wallet</button>

    );
}


export default ConnectWallet;