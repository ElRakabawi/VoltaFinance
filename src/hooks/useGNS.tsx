import { ethers } from "ethers";
import { erc20ABI, usePrepareContractWrite, useContractWrite, useContractRead, useAccount, useWaitForTransaction } from "wagmi";
import CONSTANTS from "../constants/client";
import ABIS from "../ABI/abis";

export const useApproveGNS = ():[((overrideConfig?: undefined) => void) | undefined, Boolean] => {
    const { config, error } = usePrepareContractWrite({
        address: `0x${CONSTANTS.tokens.GNS.contract}`,
        abi: erc20ABI,
        functionName: 'approve',
        args: [`0x${CONSTANTS.tokens.voltGNS.address}`, ethers.constants.MaxUint256],
    })

    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })
    
    return [write, isLoading]
}

export const useSwapGNS = (amount:number, isGNS:Boolean):[((overrideConfig?: undefined) => void) | undefined, Boolean] => {
    const { address } = useAccount()

    if(isGNS) {
        const { data, write } = useContractWrite({
            mode: "recklesslyUnprepared",
            address: `0x${CONSTANTS.tokens.voltGNS.address}`,
            abi: ABIS.voltGNS,
            functionName: 'deposit',
            args: [ethers.utils.parseEther(amount.toString()), `0x${address?.substring(2)}`],
        })

        const { isLoading, isSuccess } = useWaitForTransaction({
            hash: data?.hash,
        })
        
        return [write, isLoading]
    } else {
        const { data, write } = useContractWrite({
            mode: "recklesslyUnprepared",
            address: `0x${CONSTANTS.tokens.voltGNS.address}`,
            abi: ABIS.voltGNS,
            functionName: 'redeem',
            args: [ethers.utils.parseEther(amount.toString()), `0x${address?.substring(2)}`, `0x${address?.substring(2)}`],
        })

        const { isLoading, isSuccess } = useWaitForTransaction({
            hash: data?.hash,
        })
        
        return [write, isLoading]
    }    
}

export const useGNSAllowance = () => {
    const { address } = useAccount()

    const { data, isError, isFetching } = useContractRead({
        address: `0x${CONSTANTS.tokens.GNS.contract}`,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [`0x${address?.substring(2)}`, `0x${CONSTANTS.tokens.voltGNS.address}`],
        watch: true
    })

    return data
}

export const useGNSBalance = () => {
    const { address } = useAccount()

    const { data, isError, isFetching } = useContractRead({
        address: `0x${CONSTANTS.tokens.GNS.contract}`,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [`0x${address?.substring(2)}`],
        watch: true
    })

    return data
}

export const useVoltGNSBalance = () => {
    const { address } = useAccount()

    const { data, isError, isFetching } = useContractRead({
        address: `0x${CONSTANTS.tokens.voltGNS.address}`,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [`0x${address?.substring(2)}`],
        watch: true
    })

    return data
}

export const useSwapPrice = (amount:number, isGNS:Boolean):number => {

    if(!isGNS) amount *= 0.99;

    const { data, isError, isFetching } = useContractRead({
        address: `0x${CONSTANTS.tokens.voltGNS.address}`,
        abi: ABIS.voltGNS,
        functionName: isGNS ? 'previewDeposit' : 'previewRedeem',
        args: [ethers.utils.parseEther(amount.toString())]
    })

    return Number(data)/1e18
}
