import { FC, useEffect, useState } from "react"
import arrowImg from '../assets/img/arrow.svg'
import GNSImg from '../assets/tokens/GNS.svg'
import voltGNSImg from '../assets/tokens/voltGNS.svg'
import PrimaryBtn from "../components/PrimaryBtn"
import gDAIIMG from '../assets/tokens/gdai.png'
import { StoreContainer } from "../store"
import { ethers } from "ethers"
import { useAccount } from "wagmi"
import { useApproveGNS, useGNSAllowance, useGNSBalance, useSwapGNS, useSwapPrice, useVoltGNSBalance } from "../hooks/useGNS"
import { useApproveToken, useGDAIAllowance, useGDAIBalance, useVaultAction, useVOLTAllowance, useVoltBalance, useVOLTGNSAllowance } from "../hooks/useTokenVault"


const InputGadget: FC<any> = (({tab, vaultAsset, address, vaultId}: {tab: Number, vaultAsset:Number, address:string, vaultId:Number}) => {

    const tabNames = ["Borrow", "Repay", "Deposit", "Withdraw"];
    const [tabName, setTabName] = useState<string>(tabNames[parseInt(tab.toString())])
    const [asset, setAsset] = useState<number>(0)

    useEffect(() => {
        setTabName(tabNames[parseInt(tab.toString())])
        if(tab == 0 || tab == 1) {
            setAsset(0);
        } else if(tab == 2 || tab == 3) {
            if(vaultAsset == 0) {
                setAsset(1)
            } else {
                setAsset(2);
            }
        }
    }, [tab, vaultAsset]);

    const [tokenAmount, setTokenAmount] = useState<number>(0)

    const [gdaiBalance, setGDAIBalance] = useState<number>(0)
    const [voltgnsBalance, setVoltGNSBalance] = useState<number>(0)
    const [voltBalance, setVoltBalance] = useState<number>(0)

    const [isGDAIllowance, setIsGDAIllowance] = useState<Boolean>(false)
    const [isVOLTGNSAllowance, setIsVOLTGNSAllowance] = useState<Boolean>(false)
    const [isVOLTAllowance, setIsVOLTAllowance] = useState<Boolean>(false)

    let gdaiAllowance = useGDAIAllowance(address)
    let voltGNSAllowance = useVOLTGNSAllowance(address)
    let voltAllowance = useVOLTAllowance(address)

    let gdaiLiveBalance = useGDAIBalance()
    let voltGNSLiveBalance = useVoltGNSBalance()
    let voltLiveBalance = useVoltBalance()

    const [isLoading, setIsLoading] = useState<Boolean>(false)

    const [approveGDAI, isApproveGDAI] = useApproveToken(address, 0)
    const [approveVOLTGNS, isApproveVOLTGNS] = useApproveToken(address, 1)
    const [approveVOLT, isApproveVOLT] = useApproveToken(address, 2)
    
    const [borrow, isBorrowLoading] = useVaultAction(address, 0, tokenAmount, vaultId)
    const [payBack, isPayBackLoading] = useVaultAction(address, 1, tokenAmount, vaultId)
    const [deposit, isDepositLoading] = useVaultAction(address, 2, tokenAmount, vaultId)
    const [withdraw, isWithdrawLoading] = useVaultAction(address, 3, tokenAmount, vaultId)

    useEffect(() => {
        setIsLoading(isBorrowLoading || isPayBackLoading || isDepositLoading || isWithdrawLoading);
    }, [isBorrowLoading, isPayBackLoading, isDepositLoading, isWithdrawLoading]);

    useEffect(() => {
        if(!isLoading) {
            setTokenAmount(0);
        }
    }, [isLoading]);

    useEffect(() => {
        setIsGDAIllowance(Number(gdaiAllowance) > 0)
    }, [gdaiAllowance]);

    useEffect(() => {
        setIsVOLTGNSAllowance(Number(voltGNSAllowance) > 0)
    }, [voltGNSAllowance]);

    useEffect(() => {
        setIsVOLTAllowance(Number(voltAllowance) > 0)
    }, [voltAllowance]);

    useEffect(() => {
        setGDAIBalance(Number(ethers.utils.formatEther(gdaiLiveBalance ? gdaiLiveBalance : 0)))
    }, [gdaiLiveBalance]);

    useEffect(() => {
        setVoltGNSBalance(Number(ethers.utils.formatEther(voltGNSLiveBalance ? voltGNSLiveBalance : 0)))
    }, [voltGNSLiveBalance]);

    useEffect(() => {
        setVoltBalance(Number(ethers.utils.formatEther(voltLiveBalance ? voltLiveBalance : 0)))
    }, [voltLiveBalance]);

    const useMaxBalance = (() => {
        if(asset == 0) {
            if(voltBalance < 0.005) setTokenAmount(0)
            else setTokenAmount(voltBalance)
        } else if(asset == 1) {
            if(gdaiBalance < 0.005) setTokenAmount(0)
            else setTokenAmount(gdaiBalance)
        } else if(asset == 2) {
            if(voltgnsBalance < 0.005) setTokenAmount(0)
            else setTokenAmount(voltgnsBalance)
        }
    })

    const onChange = ((event: React.ChangeEvent<HTMLInputElement>, fn: Function, max?: Number) => {
        let value: number = parseFloat(event.target.value)
        if(Number.isNaN(value)) fn(0)
        if(max && value <= Number(max) + 99999999) value ? fn(value) : fn(0)
    })

    return (
        <>
            <div className="flex justify-between px-5 items-center w-full h-[106px] bg-volta-gray-50 rounded-lg border border-volta-gray-300 cursor-pointer dark:hover:bg-bray-800 dark:bg-volta-gray-700 hover:bg-volta-gray-100 dark:border-volta-gray-600 dark:hover:border-volta-gray-500 dark:hover:bg-volta-gray-600">
                <div>
                    {
                        asset == 0 ? (
                            <div className="bg-volta-gray-50 border border-volta-gray-300 text-volta-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:placeholder-volta-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <div className="flex py-1 px-2">
                                    <img src={GNSImg} className="mr-3 -ml-1 w-5" />
                                    <div className="text-lg font-normal">VOLT</div>
                                </div>
                            </div>
                        ) : asset == 1 ? (
                            <div className="bg-volta-gray-50 border border-volta-gray-300 text-volta-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:placeholder-volta-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <div className="flex py-1 px-2">
                                    <img src={gDAIIMG} className="mr-3 -ml-1 w-8" />
                                    <div className="text-lg font-normal">gDAI</div>
                                </div>
                            </div>
                        ) : asset == 2 ? (
                            <div className="bg-volta-gray-50 border border-volta-gray-300 text-volta-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-volta-gray-700 dark:border-volta-gray-600 dark:placeholder-volta-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <div className="flex py-1 px-2">
                                    <img src={voltGNSImg} className="mr-3 -ml-1 w-8" />
                                    <div className="text-lg font-normal">voltGNS</div>
                                </div>
                            </div>
                        ) : (<></>)
                    }
                
                </div>
                <div className="flex flex-col">
                    <input 
                        className="ml-2 p-0 pb-1 text-right overflow-hidden border-transparent float-right text-3xl font-semibold bg-transparent text-white"
                        value={Number(tokenAmount) === 0 ? '0' : Number(tokenAmount).toString()} 
                        type="number"
                        onChange={($e) => onChange($e, setTokenAmount, asset == 0 ? voltBalance : asset == 1 ? gdaiBalance : voltgnsBalance)}
                        max={ asset == 0 ? voltBalance : asset == 1 ? gdaiBalance : voltgnsBalance }
                        placeholder="0.0"
                    />
                    <div className="flex justify-end">
                        {
                            (tab == 0 || tab == 3) ? (
                                <></>
                            ) : (
                                <button 
                                    className="ml-2 text-sm text-volta-warm max-w-fit"
                                    onClick={useMaxBalance}
                                >
                                    { `Balance: ${asset == 0 ? voltBalance.toFixed(2) : asset == 1 ? gdaiBalance.toFixed(2) : voltgnsBalance.toFixed(2) }`}
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-between pb-2 px-2">
                <span className="block mt-3 mb- px-2 text-sm font-medium text-volta-gray-900 dark:text-white">{tabName} Fees</span>
                <span className="block mt-3 mb-5 px-2 text-sm font-medium text-volta-gray-900 dark:text-white">≈ {tab == 1 ? "1" : tab == 3 ? "0.5" : "0"}%</span>
            </div>
            <div className="flex items-center space-x-4">
                {   tokenAmount === 0 ?
                        <button type="button" className="text-volta-gray-100 w-full bg-blue-400 h-[50px] dark:bg-volta-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>{tabName}</button>
                    : (tab == 0) ?
                        <PrimaryBtn text="Borrow" fontWeight="medium" height={50} callbackFn={borrow}/>
                    : (tab == 1) ?
                        !isVOLTAllowance ?
                            <PrimaryBtn text="Approve VOLT" fontWeight="medium" height={50} callbackFn={approveVOLT}/>
                        : 
                            <PrimaryBtn text="Repay" fontWeight="medium" height={50} callbackFn={payBack}/>
                    : (tab == 2) ?
                        (vaultAsset == 0) ?
                            !isGDAIllowance ?
                                <PrimaryBtn text="Approve gDAI" fontWeight="medium" height={50} callbackFn={approveGDAI}/>
                            :
                                <PrimaryBtn text="Deposit" fontWeight="medium" height={50} callbackFn={deposit}/>
                        : !isVOLTGNSAllowance ?
                            <PrimaryBtn text="Approve voltGNS" fontWeight="medium" height={50} callbackFn={approveVOLTGNS}/>
                        :
                            <PrimaryBtn text="Deposit" fontWeight="medium" height={50} callbackFn={deposit}/>
                    : 
                        <PrimaryBtn text="Withdraw" fontWeight="medium" height={50} callbackFn={withdraw}/>
                }
            </div>
        </>
    )
})

export default InputGadget
