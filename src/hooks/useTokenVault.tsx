import { ethers } from "ethers"
import { erc721ABI, usePrepareContractWrite, useContractWrite, useContractRead, useAccount, useWaitForTransaction, erc20ABI } from "wagmi"
import CONSTANTS from "../constants/client"
import ABIS from "../ABI/abis"
import { readContract, readContracts, ReadContractsConfig } from '@wagmi/core'
import {Abi} from 'abitype'

export const useCreateVault = ((address:Text) => {
    const { config, error, isError } = usePrepareContractWrite({
        address: `0x${address}`,
        abi: ABIS.vault,
        functionName: 'createVault'
    })

    const { data, write } = useContractWrite(config)

    const { isLoading } = useWaitForTransaction({
        hash: data?.hash,
    })
    
    return [write, isLoading, error, isError]
})

export const useGetVaultById = ((id: number) => {
    const { address } = useAccount()

    const { data, isFetching, isError } = useContractRead({
        address: `0x${CONSTANTS.vaults.gDAI.address}`,
        abi: ABIS.vault,
        functionName: 'getUserVault',
        args: [`0x${address?.substring(2)}`, id]
    })

    return [data, isFetching, isError]
})

export const useGetMyVaults = async () => {
    const { address } = useAccount()
    if(!address) return []

    const count1 = await readContract({
        address: `0x${CONSTANTS.vaults.gDAI.address}`,
        abi: ABIS.vault,
        functionName: 'balanceOf',
        args: [`0x${address?.substring(2)}`]
    })

    const count2 = await readContract({
        address: `0x${CONSTANTS.vaults.voltGNS.address}`,
        abi: ABIS.vault,
        functionName: 'balanceOf',
        args: [`0x${address?.substring(2)}`]
    })

    let c = [];
    for(let i=0; i<Number(count1); i++) {
        c.push(
            readContract({
                address: `0x${CONSTANTS.vaults.gDAI.address}`,
                abi: ABIS.vault,
                functionName: 'getUserVault',
                args: [`0x${address?.substring(2)}`, i]
            })
        );
    }

    for(let i=0; i<Number(count2); i++) {
        c.push(
            readContract({
                address: `0x${CONSTANTS.vaults.voltGNS.address}`,
                abi: ABIS.vault,
                functionName: 'getUserVault',
                args: [`0x${address?.substring(2)}`, i]
            })
        );
    }

    const data = await Promise.all(c)
    return data
}

export const useVoltBalance = () => {
    const { address } = useAccount()

    const { data, isError, isFetching } = useContractRead({
        address: `0x${CONSTANTS.tokens.VOLT.address}`,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [`0x${address?.substring(2)}`],
        watch: true
    })

    return data
}

export const useGDAIBalance = () => {
    const { address } = useAccount()

    const { data, isError, isFetching } = useContractRead({
        address: `0x${CONSTANTS.tokens.gDAI.address}`,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [`0x${address?.substring(2)}`],
        watch: true
    })

    return data
}

export const useGDAIAllowance = (vault:string) => {
    const { address } = useAccount()

    const { data, isError, isFetching } = useContractRead({
        address: `0x${CONSTANTS.tokens.gDAI.address}`,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [`0x${address?.substring(2)}`, `0x${vault?.substring(2)}`],
        watch: true
    })

    return data
}

export const useVOLTGNSAllowance = (vault:string) => {
    const { address } = useAccount()

    const { data, isError, isFetching } = useContractRead({
        address: `0x${CONSTANTS.tokens.voltGNS.address}`,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [`0x${address?.substring(2)}`, `0x${vault?.substring(2)}`],
        watch: true
    })

    return data
}

export const useVOLTAllowance = (vault:string) => {
    const { address } = useAccount()

    const { data, isError, isFetching } = useContractRead({
        address: `0x${CONSTANTS.tokens.VOLT.address}`,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [`0x${address?.substring(2)}`, `0x${vault?.substring(2)}`],
        watch: true
    })

    return data
}

export const useApproveToken = (address:string, asset:Number):[((overrideConfig?: undefined) => void) | undefined, Boolean] => {
    const { config, error } = usePrepareContractWrite({
        address: `0x${asset == 0 ? CONSTANTS.tokens.gDAI.address : asset == 1 ? CONSTANTS.tokens.voltGNS.address : CONSTANTS.tokens.VOLT.address}`,
        abi: erc20ABI,
        functionName: 'approve',
        args: [`0x${address?.substring(2)}`, ethers.constants.MaxUint256],
    })

    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })
    
    return [write, isLoading]
}

export const useVaultAction = (address:string, action:Number, assets:Number, vaultId:Number):[((overrideConfig?: undefined) => void) | undefined, Boolean] => {

    const { data, write } = useContractWrite({
        mode: "recklesslyUnprepared",
        address: `0x${address?.substring(2)}`,
        abi: ABIS.vault,
        functionName: `${action == 0 ? 'borrowToken' : action == 1 ? 'payBackToken' : action == 2 ? 'depositCollateral' : 'withdrawCollateral'}`,
        args: [vaultId, ethers.utils.parseEther(assets.toString())],
    })

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })
    
    return [write, isLoading]
}