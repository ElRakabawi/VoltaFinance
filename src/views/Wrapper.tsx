import { FC, useEffect, useState } from "react"
import arrowImg from '../assets/img/arrow.svg'
import GNSImg from '../assets/tokens/GNS.svg'
import voltGNSImg from '../assets/tokens/voltGNS.svg'
import PrimaryBtn from "../components/PrimaryBtn"
import RightArrowIcon from "../components/Icons/RightArrowIcon"
import { StoreContainer } from "../store"
import { ethers } from "ethers"
import { useAccount } from "wagmi"
import { useApproveGNS, useGNSAllowance, useGNSBalance, useSwapGNS, useSwapPrice, useVoltGNSBalance } from "../hooks/useGNS"

const Wrapper: FC<Record<string, never>> = (() => {
    let store = StoreContainer.useContainer()
    const { address } = useAccount()

    const [gnsAmount, setGNSAmount] = useState<number>(0)
    const [voltGNSAmount, setVoltGNSAmount] = useState<number>(0)
    const [gnsBalance, setGNSBalance] = useState<number>(0)
    const [voltgnsBalance, setVoltGNSBalance] = useState<number>(0)
    const [isGNSAllowance, setIsGNSAllowance] = useState<Boolean>(false)
    const [isGNStoVolt, setIsGNStoVolt] = useState<Boolean>(true)

    let gnsLiveAllowance = useGNSAllowance()
    let gnsLiveBalance = useGNSBalance()
    let voltGNSLiveBalance = useVoltGNSBalance()
    let swapLivePrice = useSwapPrice(gnsAmount, isGNStoVolt)
    let pricePerOne = useSwapPrice(1, true)

    const [approveGNS, isApproveLoading] = useApproveGNS()
    const [swapGNS, isSwapLoading] = useSwapGNS(gnsAmount, isGNStoVolt)

    useEffect(() => {
        setVoltGNSAmount(swapLivePrice)
    }, [swapLivePrice]);

    useEffect(() => {
        if(!isSwapLoading) {
            setGNSAmount(0);
        }
    }, [isSwapLoading]);

    useEffect(() => {
        setIsGNSAllowance(Number(gnsLiveAllowance) > 0)
    }, [gnsLiveAllowance]);

    useEffect(() => {
        setGNSBalance(Number(ethers.utils.formatEther(gnsLiveBalance ? gnsLiveBalance : 0)))
    }, [gnsLiveBalance]);

    useEffect(() => {
        setVoltGNSBalance(Number(ethers.utils.formatEther(voltGNSLiveBalance ? voltGNSLiveBalance : 0)))
    }, [voltGNSLiveBalance]);

    const onChange = ((event: React.ChangeEvent<HTMLInputElement>, fn: Function, max?: Number) => {
        let value: number = parseFloat(event.target.value)
        if(Number.isNaN(value)) fn(0)
        if(max && value <= Number(max) + 99999999) value ? fn(value) : fn(0)
    })

    const useMaxBalance = (() => {
        if(isGNStoVolt) {
            if(gnsBalance < 0.005) setGNSAmount(0)
            else setGNSAmount(gnsBalance)
        } else {
            if(voltgnsBalance < 0.005) setGNSAmount(0)
            else setGNSAmount(voltgnsBalance)
        }
    })

    const swapTokens = () => {
        setIsGNStoVolt(!isGNStoVolt)
        setGNSAmount(0)
    }


    return (
        <>
            <section className="grid h-full place-items-center">
                <div className="flex justify-center m-5">
                    <h1 className="block my-3 uppercase font-normal text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <span className="font-medium">Tokens</span> Wrapping
                    </h1>
                </div>

                <div className="mx-auto justify-center items-center w-full md:inset-0 h-modal md:h-full">
                    <div className="mx-auto first-letter:pl-4 w-full max-w-3xl h-full md:h-auto">
                        <div className="relative p-4 bg-white rounded-lg shadow dark:backdrop-blur-md dark:bg-volta-gray-800 border border-volta-gray-500 sm:p-5 p-t-10">
                            <div className="flex justify-between items-center p-5 rounded-t border-b sm:mb-5 dark:border-volta-gray-500">
                                <div className="flex">
                                    {
                                        isGNStoVolt ?
                                        ( 
                                            <img src={GNSImg} className="mr-2 w-4" />
                                        ) : (<></>)
                                    }
                                    {                  
                                        isGNStoVolt ? (
                                            <h3 className="text-xl font-semibold text-volta-gray-900 dark:text-white inline">GNS</h3>
                                        ) : (
                                            <h3 className=" text-xl font-semibold text-primary-600 text-transparent bg-clip-text bg-gradient-to-r to-volta-warm from-volta-cool">voltGNS</h3>
                                        )
                                    }
                                   
                                    <div className="ml-2 mt-0.5">
                                        <RightArrowIcon width={6} />
                                    </div>

                                    {
                                        !isGNStoVolt ?
                                        ( 
                                            <img src={GNSImg} className="ml-2 w-4" />
                                        ) : (<></>)
                                    }
                                    {                  
                                        !isGNStoVolt ? (
                                            <h3 className="ml-2 text-xl font-semibold text-volta-gray-900 dark:text-white inline">GNS</h3>
                                        ) : (
                                            <h3 className="ml-2 text-xl font-semibold text-primary-600 text-transparent bg-clip-text bg-gradient-to-r to-volta-warm from-volta-cool">voltGNS</h3>
                                        )
                                    }
                                    
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-white text-sm font-light"><span className="opacity-50">Supply Cap</span> 25,000 <span className="opacity-50">of</span> 100,000</h1>
                                    <div className="flex justify-end mt-2 items-right text-sm font-normal text-white">
                                        1 <span className="mr-2 ml-1 font-semibold text-transparent bg-clip-text bg-gradient-to-r to-volta-warm from-volta-cool">voltGNS</span> ≈ {(1/pricePerOne).toFixed(3)} GNS
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center mb-4">
                                        <h1 className="text-white px-4">Swap {isGNStoVolt ? "GNS" : "voltGNS"}  to recieve {!isGNStoVolt ? "GNS" : "voltGNS"}. </h1>
                                    </div>
                                    <div className="flex flex-col mb-2 px-4">
                                        {/* <PrimaryBtn text={isGNStoVolt ? "Withdraw" : "Deposit"} fontSize="xs" height={35} callbackFn={swapTokens}/> */}
                                    </div>
                                </div>
                                <div className="flex justify-between px-5 items-center w-full h-[106px] bg-volta-gray-50 rounded-lg border border-volta-gray-300 cursor-pointer dark:hover:bg-bray-800 dark:bg-volta-gray-700 hover:bg-volta-gray-100 dark:border-volta-gray-600 dark:hover:border-volta-gray-500 dark:hover:bg-volta-gray-600">
                                    <div>
                                        {
                                            isGNStoVolt ? (
                                                <div className="bg-volta-gray-50 border border-volta-gray-300 text-volta-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:placeholder-volta-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <div className="flex py-1 px-2">
                                                        <img src={GNSImg} className="mr-3 -ml-1 w-5" />
                                                        <div className="text-lg font-normal">GNS</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-volta-gray-50 border border-volta-gray-300 text-volta-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:placeholder-volta-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <div className="flex py-1 px-2">
                                                        <img src={voltGNSImg} className="mr-3 -ml-1 w-8" />
                                                        <div className="text-lg font-normal">voltGNS</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                       
                                    </div>
                                    <div className="flex flex-col">
                                        <input 
                                            className="ml-2 p-0 pb-1 text-right overflow-hidden border-transparent float-right text-3xl font-semibold bg-transparent text-white"
                                            value={Number(gnsAmount) === 0 ? '0' : Number(gnsAmount).toString()} 
                                            type="number"
                                            onChange={($e) => onChange($e, setGNSAmount, gnsBalance)}
                                            max={gnsBalance ? gnsBalance : 0}
                                            placeholder="0.0"
                                        />
                                        <div className="flex justify-end">
                                            <button 
                                                className="ml-2 text-sm text-volta-warm max-w-fit"
                                                onClick={useMaxBalance}
                                            >
                                                { `Balance: ${isGNStoVolt ? gnsBalance.toFixed(2) : voltgnsBalance.toFixed(2) }`}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="items-center w-full flex justify-center">
                                    <div className="swap">
                                        <img className="swap-arrow" src={arrowImg} style={{padding: '10px', cursor: 'pointer'}} onClick={swapTokens}/>
                                    </div>
                                </div>
                                <div className="flex mt-4 justify-between px-5 items-center w-full h-[106px] bg-volta-gray-50 rounded-lg border border-volta-gray-300 cursor-pointer dark:hover:bg-bray-800 dark:bg-volta-gray-700 hover:bg-volta-gray-100 dark:border-volta-gray-600 dark:hover:border-volta-gray-500 dark:hover:bg-volta-gray-600">
                                    <div>
                                        {
                                            isGNStoVolt ? (
                                                <div className="bg-volta-gray-50 border border-volta-gray-300 text-volta-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:placeholder-volta-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <div className="flex py-1 px-2">
                                                        <img src={voltGNSImg} className="mr-3 -ml-1 w-8" />
                                                        <div className="text-lg font-normal">voltGNS</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-volta-gray-50 border border-volta-gray-300 text-volta-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:placeholder-volta-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <div className="flex py-1 px-2">
                                                        <img src={GNSImg} className="mr-3 -ml-1 w-5" />
                                                        <div className="text-lg font-normal">GNS</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-col">
                                        <input 
                                            className="ml-2 p-0 pb-1 text-right overflow-hidden border-transparent float-right text-3xl font-semibold bg-transparent text-white"
                                            value={Number(voltGNSAmount) === 0 ? '' : Number(voltGNSAmount).toString()} 
                                            type="number"
                                            placeholder="0.0"
                                            disabled
                                        />                                        
                                        <h3 className="ml-2 text-sm text-right font-light text-white opacity-50">Balance: {isGNStoVolt ? voltgnsBalance.toFixed(2) : gnsBalance.toFixed(2)}</h3>
                                    </div>
                                </div>
                                <div className="flex justify-between pb-2 px-2">
                                    <span className="block mt-3 mb- px-2 text-sm font-medium text-volta-gray-900 dark:text-white">{isGNStoVolt ? "Deposit" : "Withdraw"} Fees</span>
                                    <span className="block mt-3 mb-5 px-2 text-sm font-medium text-volta-gray-900 dark:text-white">≈ {isGNStoVolt ? "0" : "1"}%</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {   gnsAmount === 0 ?
                                            <button type="button" className="text-volta-gray-100 w-full bg-blue-400 h-[50px] dark:bg-volta-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Swap</button>
                                        : (isGNStoVolt ? (gnsAmount > gnsBalance) : (gnsAmount > voltgnsBalance)) ?
                                            <button type="button" className="text-volta-gray-100 w-full bg-blue-400 h-[50px] dark:bg-volta-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Insufficient Balance</button>
                                        : (isGNSAllowance || !isGNStoVolt) ?
                                            <PrimaryBtn text="Swap" fontWeight="medium" height={50} callbackFn={swapGNS}/>
                                        :
                                            <PrimaryBtn text="Approve" fontWeight="medium" height={50} callbackFn={approveGNS}/>
                                    }

                                </div>
                                <div className="flex justify-center mt-3 items-center text-sm font-normal text-white">
                                    <span className="mr-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r to-volta-warm from-volta-cool">0.00%</span> EST. APR
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
})

export default Wrapper