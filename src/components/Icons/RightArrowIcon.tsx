import { FC } from "react"

const RightArrowIcon: FC<any> = (({ width=5 }:{ width: number }) => {
    return(
        <svg className={`w-${width} text-white`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
    )
})

export default RightArrowIcon