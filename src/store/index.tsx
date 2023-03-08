// global state
import { createContainer } from "unstated-next"
import { useState } from "react"
import { BigNumber } from "ethers"

interface token {
    name: string,
    balance: BigNumber
}

interface state {
    userAddress: string | undefined,
    ethBal: BigNumber | undefined,
    tokensBal: token[]
}

let iniState: state = {
    userAddress: undefined,
    ethBal: undefined,
    tokensBal: []
}

const Store = ((initialState = iniState) => {
    let [userAddress, setUserAddress] = useState<string | undefined>(initialState.userAddress)
    let [ethBal, setEthBal] = useState<BigNumber | undefined>(initialState.ethBal)
    let [tokensBal, setTokensBal] = useState<token[]>(initialState.tokensBal)

  
    return { 
        userAddress, setUserAddress,
        ethBal, setEthBal,
        tokensBal, setTokensBal
    }
})

export const StoreContainer = createContainer(Store)