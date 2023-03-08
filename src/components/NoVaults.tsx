import { FC, ReactFragment, ReactNode, useEffect} from "react"
import { render } from "react-dom"
import PrimaryBtn from "./PrimaryBtn"
import gDAIIMG from '../assets/tokens/gdai.png'
import voltGNSImg from '../assets/tokens/voltGNS.svg'
import { useCreateVault } from "../hooks/useTokenVault"
import Spinner from "./Icons/Spinner"
import { ethers } from "ethers"

const NoVaults: FC<any> = (({vaultObject}: {vaultObject: any}) => {

    return (
        <div className="w-full px-8 py-7 bg-white border border-volta-gray-300 rounded-lg shadow dark:bg-volta-gray-700 hover:bg-volta-gray-100 dark:border-volta-gray-600">
            <div className="flex mb-2 text-2xl font-medium text-volta-gray-900 dark:text-white">
                
                <span><center>No Vaults!</center></span>
            </div>
            <div className="flex flex-col mt-4 font-light text-base dark:text-gray-500">
                <div className="flex justify-between my-1">
                    <div><center>Create a vault to start borrowing</center></div>
                </div>
            </div>
        </div>
    )
})

export default NoVaults

