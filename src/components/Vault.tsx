import { FC, ReactFragment, ReactNode} from "react"
import { render } from "react-dom"
import PrimaryBtn from "./PrimaryBtn"
import gDAIIMG from '../assets/tokens/gdai.png'
import voltGNSImg from '../assets/tokens/voltGNS.svg'
import { useCreateVault } from "../hooks/useTokenVault"
import Spinner from "./Icons/Spinner"

const Vault: FC<any> = (({vaultObject}: {vaultObject: any}) => {

    const [createVault, isCreateLoading, createError, isCreateError] = useCreateVault(vaultObject.address)

    return (
        <div className="w-[320px] px-8 py-7 bg-white border border-volta-gray-300  rounded-lg shadow dark:bg-volta-gray-700 hover:bg-volta-gray-100 dark:border-volta-gray-600">
            <div className="flex mb-2 text-2xl font-medium text-volta-gray-900 dark:text-white">
                <img src={vaultObject.id == 0 ? gDAIIMG : voltGNSImg} className="mr-3 -ml-1 w-10 h-10" />
                <span style={{ lineHeight: 40 + 'px'}}>{vaultObject.name}</span>
            </div>
            <div className="flex flex-col mt-4 font-light text-base dark:text-gray-500">
                <div className="flex justify-between my-1">
                    <div>Locked Collateral</div>
                    <div>Example A</div>
                </div>
                <div className="flex justify-between my-1">
                    <div>Available</div>
                    <div>Example A</div>
                </div>
                <div className="flex justify-between my-1">
                    <div>Debt.</div>
                    <div>Example A</div>
                </div>
                <div className="flex justify-between my-1">
                    <div>Ratio</div>
                    <div>Example A</div>
                </div>
            </div>
            <div className="flex flex-col mt-8 pt-2">
                <PrimaryBtn text="Create Vault" fontSize="base" icon={isCreateLoading ? <Spinner /> : undefined} fontWeight="semibold" height={45} callbackFn={createVault}/>
            </div>
        </div>
    )
})

export default Vault

