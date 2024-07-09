import * as React from 'react'
import { Connector, useConnect } from 'wagmi'

export  function handleConnect(connectors: readonly Connector[]){

    return connectors.map((connector) => (
        connector.connect()
    ))
}

export const ConnectWallet = () =>{
    const { connectors } = useConnect()


    return (
        <div>
            <button onClick={() => handleConnect(connectors)}>Connect Wallet</button>
        </div>
    );
}


export default ConnectWallet;