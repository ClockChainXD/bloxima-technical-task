import { http, createConfig } from 'wagmi'
import { mainnet, holesky } from 'wagmi/chains'
import { metaMask} from 'wagmi/connectors'


export const config = createConfig({
  chains: [mainnet, holesky],
  connectors: [
    metaMask()
  ],
  transports: {
    [mainnet.id]: http(),
    [holesky.id]: http(),
  },
})