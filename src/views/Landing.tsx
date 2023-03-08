import { FC } from "react"
import LogoTypo from '../assets/img/LogoTypo.svg'
import { useNavigate } from "react-router-dom"
const Landing: FC<any> = (() => {
    const navigate = useNavigate()

    return (
        <>
            <section className="grid h-screen -mt-[110px] place-items-center">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <img className="inline-flex justify-between items-center mb-7" src={LogoTypo} />

                    <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-volta-gray-900 md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-volta-warm from-volta-cool">Borrow and Lend <br /> with Trust</h1>
                    <p className="mb-8 text-base font-normal text-volta-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-volta-gray-50">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

                    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">

                        <button onClick={() => navigate('/wrapper')} className="inline-flex justify-center items-center py-3 px-5 text-base font-semibold text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 bg-gradient-to-r from-volta-cool to-volta-warm hover:bg-gradient-to-r focus:outline-none focus:ring-volta-warm dark:focus:ring-volta-cool">
                            Wrapping
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>

                        <button onClick={() => navigate('/vaults')} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-volta-gray-900 rounded-lg border border-volta-gray-300 hover:bg-volta-gray-100 focus:ring-4 focus:ring-volta-gray-100 dark:text-white dark:border-volta-gray-700 dark:bg-volta-gray-600 dark:hover:bg-volta-gray-400 dark:focus:ring-volta-gray-800">
                            Create Vault
                        </button>  
                    </div>

                    <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">

                        <div className="flex flex-wrap justify-center items-center mt-8 text-volta-gray-500 sm:justify-between">
                            <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-volta-gray-800 dark:hover:text-volta-gray-400">
                        
                            </a>
                            <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-volta-gray-800 dark:hover:text-volta-gray-400">
                        
                            </a>
                            <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-volta-gray-800 dark:hover:text-volta-gray-400">
                                                    
                            </a>         
                        </div>
                    </div> 
                </div>
            </section>
        </>
    )
})

export default Landing