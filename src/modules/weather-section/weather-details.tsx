import { twMerge } from 'tailwind-merge'
import { CleanWeatherDataType } from '../../types'
import { ThemeContext } from '../../contexts/theme'
import { useContext } from 'react'

const WeatherDetails = ({
    cleanData
}: {
    cleanData: CleanWeatherDataType | null
}) => {
    const { theme } = useContext(ThemeContext)
    const isLight = theme === 'light'

    return (
        <>
            {!cleanData ? <p className="text-center my-10">No data</p> : (
                <>
                    <p className={twMerge(
                        "text-[4rem] font-bold leading-[4rem]",
                        isLight ? 'text-purple-800' : 'text-white'
                    )}>{cleanData?.temp}°</p>
                    <p className="text-sm">H: {cleanData?.tempMax}° L: {cleanData?.tempMin}°</p>
                    <div className={twMerge(
                        "flex justify-between mt-2",
                        isLight ? 'text-gray-500' : 'text-white'
                    )}>
                        <p className="font-bold">{cleanData?.city}, {cleanData?.country}</p>
                        <p>{cleanData?.date}</p>
                        <p>Humidity: {cleanData?.humidity}%</p>
                        <p>{cleanData?.weather}</p>
                    </div>
                </>
            )}
        </>
    )
}

export default WeatherDetails