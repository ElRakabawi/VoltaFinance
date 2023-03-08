import { FC, useEffect, useState} from "react"
import PrimaryBtn from "./PrimaryBtn"
import gDAIIMG from '../assets/tokens/gdai.png'
import voltGNSIMG from '../assets/tokens/voltGNS.svg'
import { ethers } from "ethers"
import { useNavigate } from "react-router-dom"
import CONSTANTS from "../constants/client"
import { formatPrecision } from "../utils/formatBN"

const MyVault: FC<any> = (({vaultObject}: {vaultObject: any}) => {
    const navigate = useNavigate()

    const [vaultAsset, setVaultAsset] = useState<number>(0)
    
    const manageVault = () => {
        navigate(`/manage/`, { state: { vaultObject, vaultAsset } })
    }

    useEffect(() => {
        console.log(vaultObject._collateralAsset, `0x${CONSTANTS.tokens.gDAI.address}`, `0x${CONSTANTS.tokens.voltGNS.address}`, vaultObject._collateralAsset == `0x${CONSTANTS.tokens.gDAI.address}`, vaultObject._collateralAsset == `0x${CONSTANTS.tokens.voltGNS.address}`);

        if(vaultObject._collateralAsset == `0x${CONSTANTS.tokens.gDAI.address}`) setVaultAsset(0);
        if(vaultObject._collateralAsset == `0x${CONSTANTS.tokens.voltGNS.address}`) setVaultAsset(1);
    }, []);

    return (
        <div className="w-[320px] px-8 py-7 bg-white border border-volta-gray-300  rounded-lg shadow dark:bg-volta-gray-700 hover:bg-volta-gray-100 dark:border-volta-gray-600">
            <div className="flex mb-2 text-2xl font-medium text-volta-gray-900 dark:text-white">
                <img src={vaultAsset == 0 ? gDAIIMG : voltGNSIMG} className="mr-3 -ml-1 w-10 h-10" />
                <span style={{ lineHeight: 40 + 'px'}}>{vaultAsset == 0 ? "gDAI" : "voltGNS"} #{vaultObject._vaultId.toString()}</span>
            </div>
            <div className="flex flex-col mt-4 font-light text-base dark:text-gray-500">
                <div className="flex justify-between my-1">
                    <div>Collateral</div>
                    <div>{formatPrecision(vaultObject._collateral)} {vaultAsset == 0 ? "gDAI" : "voltGNS"}</div>
                </div>
                <div className="flex justify-between my-1">
                    <div>Collateral in $</div>
                    <div>${formatPrecision(vaultObject._collateralValue)}</div>
                </div>
                <div className="flex justify-between my-1">
                    <div>Debt.</div>
                    <div>{formatPrecision(vaultObject._debt)} VOLT</div>
                </div>
                <div className="flex justify-between my-1">
                    <div>Ratio</div>
                    <div>{ethers.utils.formatEther(vaultObject._percent) == ethers.utils.formatEther(ethers.constants.MaxUint256) ? ethers.utils.formatEther(vaultObject._collateral).toString() == "0.0" ? "None" : "Max" : vaultObject._percent.toString()+"%"}</div>
                </div>
            </div>
            <div className="flex flex-col mt-8 pt-2">
                <PrimaryBtn callbackFn={manageVault} text="Manage Vault" fontSize="base" fontWeight="semibold" height={45}/>
            </div>
        </div>
    )
})

export default MyVault

