import { useContext, useEffect } from "react"
import { ThemeContext } from "../contexts/theme"

const ThemeSwitch = (props: any) => {
    const {theme, setTheme} = useContext(ThemeContext)

    useEffect(() => {
        setTheme?.(localStorage.getItem('theme') as 'dark' || 'light')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangeTheme = () => { 
        setTheme?.(theme === 'light' ? 'dark' : 'light')
     }

    return (
        <div {...props}>
            <label className="inline-flex items-center cursor-pointer">
                <input
                onChange={handleChangeTheme}
                type="checkbox" 
                checked={theme ==='light'} 
                className="sr-only peer" 
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300"></div>
            </label>
        </div>
    )
}

export default ThemeSwitch