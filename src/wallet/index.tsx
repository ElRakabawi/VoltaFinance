import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const Chains = [arbitrum]

const { chains, provider } = configureChains(
  Chains,
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID, priority: 1 }),
    publicProvider({ priority: 2 })
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Volta',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default wagmiClient
export { Chains }