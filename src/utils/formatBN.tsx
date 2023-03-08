import { BigNumber } from "ethers"
import { ethers } from "ethers"

export const formatBalance = ((balance: BigNumber): string => {
    return ethers.utils.formatEther(balance)
})

export const formatPrecision = ((balance: any, decimals: string = 'ether', precision: number = 3): string => {
    return Number(ethers.utils.formatUnits(balance, decimals)).toFixed(precision)
})
