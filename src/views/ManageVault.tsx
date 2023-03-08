import { FC, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import voltGNSImg from '../assets/tokens/voltGNS.svg'
import gDAIIMG from '../assets/tokens/gdai.png'
import { ethers } from "ethers"
import InputGadget from '../components/InputGadget'
import { formatPrecision } from "../utils/formatBN"

const Vaults: FC<Record<string, never>> = (() => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [vaultObject, setVaultObject] = useState<any>(undefined)
    const [vaultAsset, setVaultAsset] = useState<any>(undefined)

    useEffect(() => {
        if(state) {
            console.log(state.vaultObject)
            setVaultObject(state.vaultObject)
            setVaultAsset(state.vaultAsset)
        } else navigate('/vaults/')
    }, [])

    const [currentTab, setCurrentTab] = useState<Number>(0)

    return (
        <>
        { vaultObject? (
        <>
        <section className="grid h-full place-items-center">
            <div className="flex justify-center m-5">
                <h1 className="block my-3 uppercase font-normal text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <span className="font-medium">Manage</span> Vault
                </h1>
            </div>

            <div className="mx-auto justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div className="mx-auto first-letter:pl-4 w-full max-w-3xl h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:backdrop-blur-md dark:bg-volta-gray-800 border border-volta-gray-500 sm:p-5 p-t-10">
                        <div className="flex justify-between items-center p-5 rounded-t border-b sm:mb-5 dark:border-volta-gray-500">
                        <div className="flex mb-2 text-2xl font-medium text-volta-gray-900 dark:text-white">
                            <img src={vaultAsset == 0 ? gDAIIMG : voltGNSImg} className="mr-3 -ml-1 w-10 h-10" />
                            <span style={{ lineHeight: 40 + 'px'}}>{vaultAsset == 0 ? "gDAI" : "voltGNS"} Vault #{ formatPrecision(vaultObject._vaultId, 'wei', 0) }</span>
                        </div>
                            <div className="flex flex-col">
                                {/* <h1 className="text-white text-sm font-light"><span className="opacity-50">Supply Cap</span> 25,000 <span className="opacity-50">of</span> 100,000</h1>
                                <div className="flex justify-end mt-2 items-right text-sm font-normal text-white">
                                    1 <span className="mr-2 ml-1 font-semibold text-transparent bg-clip-text bg-gradient-to-r to-volta-warm from-volta-cool">voltGNS</span> ≈ {(1/pricePerOne).toFixed(3)} GNS
                                </div> */}
                            </div>
                        </div>
                        <div className="flex flex-col px-4 mt-4 font-light text-base dark:text-gray-500">
                            <div className="flex justify-between my-1">
                                <div>Collateral</div>
                                <div className="font-medium">{formatPrecision(vaultObject._collateral)} gDAI</div>
                            </div>
                            <div className="flex justify-between my-1">
                                <div>Collateral Value</div>
                                <div className="font-medium">${formatPrecision(vaultObject._collateralValue)}</div>
                            </div>
                            <div className="flex justify-between my-1">
                                <div>Debt</div>
                                <div className="font-medium">{formatPrecision(vaultObject._debt)} VOLT</div>
                            </div>
                            <div className="flex justify-between my-1">
                                <div>Debt Value</div>
                                <div className="font-medium">${formatPrecision(vaultObject._debtValue)}</div>
                            </div>
                            <div className="flex justify-between my-1">
                                <div>Current Collateral Percentage</div>
                                <div className="font-medium">{
                                    (formatPrecision(vaultObject._percent, 'ether', 0)) == (formatPrecision(ethers.constants.MaxUint256, 'ether', 0)) ?
                                    (formatPrecision(vaultObject._collateral, 'ether', 0)).toString() == "0.0" ?
                                    "None" : 
                                    "Max" :
                                    (formatPrecision(vaultObject._percent, 'wei', 0)).toString() + "%"}
                                </div>                            </div>
                            <div className="flex justify-between my-1">
                                <div>Minimum Collateral Percentage</div>
                                <div className="font-medium">{(formatPrecision(vaultObject.__minimumCollateralPercentage, 'wei', 0)) + "%"}</div>
                            </div>
                            <div className="flex justify-between my-1">
                                <div>Minimum Debt</div>
                                <div className="font-medium">{(ethers.utils.formatEther(vaultObject._minDebt))} gDAI</div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="flex flex-col">
                                <div className="flex items-center mb-4">
                                    <h1 className="text-white px-4">Manage</h1>
                                </div>
                                <div className="inline-flex mx-auto mb-4 rounded-md shadow-sm" role="group">
                                    <button onClick={() => setCurrentTab(0)} type="button" className="px-10 py-3 text-sm font-medium text-volta-gray-900 bg-white border border-volta-gray-200 rounded-l-lg hover:bg-volta-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-volta-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                        Borrow
                                    </button>
                                    <button onClick={() => setCurrentTab(1)} type="button" className="px-10 py-3 text-sm font-medium text-volta-gray-900 bg-white border-t border-b border-volta-gray-200 hover:bg-volta-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-volta-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                        Repay
                                    </button>
                                    <button onClick={() => setCurrentTab(2)} type="button" className="px-10 py-3 text-sm font-medium text-volta-gray-900 bg-white border border-volta-gray-200 hover:bg-volta-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-volta-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                        Deposit
                                    </button>
                                    <button onClick={() => setCurrentTab(3)} type="button" className="px-10 py-3 text-sm font-medium text-volta-gray-900 bg-white border border-volta-gray-200 rounded-r-md hover:bg-volta-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-volta-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                            <InputGadget tab={currentTab} vaultAsset={vaultAsset} address={vaultObject._vault} vaultId={vaultObject._vaultId} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
        ) : (<></>)}
        </>
    )
})

export default Vaults