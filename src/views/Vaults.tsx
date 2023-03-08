import { FC, useEffect, useState } from "react"
import { useGetMyVaults } from "../hooks/useTokenVault"
import Vault from "../components/Vault"
import MyVault from "../components/MyVault"
import CONSTANTS from "../constants/client"
import { randomBytes } from "ethers/lib/utils.js"
import Spinner from "../components/Icons/Spinner"

const Vaults: FC<Record<string, never>> = (() => {
    const [myVaults, setMyVaults] = useState<unknown[]>()
    let myV = useGetMyVaults()

    useEffect(() => {
        const x = async () => {
            setMyVaults(await myV);
        }
        
        x();
    }, [myV]);

    return (
        <>
            <section className="grid h-full place-items-center">
                <div className="flex justify-center m-5">
                    <h1 className="block my-3 uppercase font-normal text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <span className="font-medium">VAULTS</span> Overview
                    </h1>
                </div>
                <div className="mx-auto justify-center items-center w-full md:inset-0 h-modal md:h-full">
                    <div className="mx-auto w-full max-w-[1100px] h-auto">
                        <div className="relative p-4 bg-white rounded-lg shadow dark:backdrop-blur-md dark:bg-volta-gray-800 border border-volta-gray-500 sm:p-5 p-t-10">
                            {
                                !myVaults?.length ?
                                    (<></>)
                                :
                                (
                                    <div className="my-2">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center mt-2">
                                                <h1 className="blocks text-base uppercase font-normal text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                    <span className="font-medium">My</span> Vaults
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="flex gap-7 px-5 items-center w-full h-full p-5 flex-wrap">
                                        {
                                            myVaults?.map((vault, i) => {
                                                return (<MyVault vaultObject={vault} key={randomBytes+""+i}/>)
                                            })
                                        }
                                        </div>
                                    </div>
                                )
                            }
                            <div className="my-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center mt-2">
                                        <h1 className="flex flex-col gap-0 font-normal text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            <span className="font-medium text-base uppercase text-left">Create New Vault</span>
                                            <div className="flex flex-col mt-2 font-light text-base dark:text-gray-500">
                                                {
                                                    !myVaults?.length ? (<div>Create a vault to start borrowing</div>) : (<></>)
                                                }
                                        </div>
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex gap-7 px-5 items-center w-full h-full p-5">
                                    <Vault vaultObject={CONSTANTS.vaults.gDAI} key={randomBytes+"0"}/>
                                    <Vault vaultObject={CONSTANTS.vaults.voltGNS} key={randomBytes+"1"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !myVaults?.length ? (
                        <div className="my-2 flex">
                            <div>
                                <Spinner width={4} color="volta-cool" />
                            </div>
                            <h1 className="text-sm mt-1 font-semibold text-transparent bg-clip-text bg-gradient-to-r to-volta-warm from-volta-cool">Fetching Vaults..</h1>
                        </div>
                    ) : (<></>)
                }
            </section>
        </>
    )
})

export default Vaults