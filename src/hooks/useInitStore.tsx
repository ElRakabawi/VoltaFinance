import { StoreContainer } from "../store"
import { useBalance, useAccount } from 'wagmi'

const { address, isConnecting, isDisconnected } = useAccount()
const balance  = address ? useBalance({address}).data?.value : undefined

const store = StoreContainer.useContainer()

const useInitStore = (() => {
    store.setUserAddress(address)
    store.setEthBal(balance)
})

export default useInitStore