import { forwardRef, useContext } from "react"
import { twMerge } from "tailwind-merge"
import { ThemeContext } from "../contexts/theme"

const defaultClass = 'w-full h-10 rounded-xl px-4 focus:outline-none bg-opacity-25'
const lightClass = 'text-black placeholder:text-gray-500 bg-white'
const darkClass = 'text-white placeholder:text-white bg-black'

const Input = forwardRef(({
    className,
    ...props
}: any, ref) => {
    const { theme } = useContext(ThemeContext)
    return (
        <input
            ref={ref}
            {...props}
            className={twMerge(className, defaultClass, theme === 'light' ? lightClass : darkClass)}
        />
    )
})

export default Input