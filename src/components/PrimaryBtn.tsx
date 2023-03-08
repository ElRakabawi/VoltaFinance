import { FC,  ReactNode} from "react"

const PrimaryBtn: FC<any> = (({text, icon=undefined, height=`${40}px`, fontSize="base", fontWeight="medium", callbackFn}: {text: string, icon: ReactNode | undefined, height?: any, fontSize: string, fontWeight?: string, callbackFn?: any}) => {
    return (
        <div className="mx-auto w-full">
            <button type="button"
                onClick={callbackFn}
                style={{height}}
                className={`font-${fontWeight} text-${fontSize} ${icon? 'ml-2' : ''}` + "text-gray-900 w-full bg-gradient-to-r from-volta-cool to-volta-warm hover:bg-gradient-to-r focus:ring-4 focus:outline-none focus:ring-volta-warm dark:focus:ring-volta-cool rounded-lg px-5 py-2 text-center mr-2 mb-2"}>
                {icon}
                {text}
            </button>
        </div>
    )
})

export default PrimaryBtn