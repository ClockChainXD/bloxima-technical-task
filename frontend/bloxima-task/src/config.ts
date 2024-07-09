import { http, createConfig } from 'wagmi'
import { mainnet, holesky } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, holesky],
  connectors: [],
  transports: {
    [mainnet.id]: http(),
    [holesky.id]: http(),
  },
})