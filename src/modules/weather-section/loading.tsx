import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from '../../contexts/theme'

const Loading = () => {
    const { theme } = useContext(ThemeContext)
    const isLight = theme === 'light'
    return (
        <div
            className={twMerge(
                "absolute w-full h-full flex justify-center items-center bg-opacity-20 top-0 left-0 rounded-xl",
                isLight ? 'bg-white' : 'bg-black'
            )}
        >
            <p>Loading...</p>
        </div>
    )
}

export default Loading