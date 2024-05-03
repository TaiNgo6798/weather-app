import dayjs from "dayjs"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { twMerge } from "tailwind-merge"
import CloudIcon from '../../assets/cloud.png'
import SunIcon from '../../assets/sun.png'
import { SearchHistoryItem } from "../../contexts/search-histories"
import { ThemeContext } from "../../contexts/theme"
import { CleanWeatherDataType } from "../../types"
import HistoryList from "./history-list"
import Loading from "./loading"
import WeatherDetails from "./weather-details"

const WeatherSection = ({
    searchText,
    onSearchClick
}: {
    searchText: string
    onSearchClick: (data: SearchHistoryItem) => void
}) => {
    const [data, setData] = useState<Record<string, any> | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { theme } = useContext(ThemeContext)
    const isLight = theme === 'light'

    const fetchData = useCallback(async ({
        searchText = '',
    }: {
        searchText: string,
    }) => {
        try {
            if (isLoading) return
            setIsLoading(true)
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}&units=metric`)
            const weatherData = await res.json()
            if (!res.ok) throw new Error(weatherData.message)
            setData(weatherData)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            setData(null)
        }
    }, [isLoading])

    useEffect(() => {
        if (searchText === '') return
        fetchData({
            searchText
        })
        // eslint-disable-next-line
    }, [searchText])

    const cleanData: CleanWeatherDataType | null = useMemo(() => {
        if (!data) return null
        return {
            temp: Math.floor(Number(data?.main?.temp)),
            humidity: Math.floor(data?.main?.humidity),
            tempMax: Math.floor(data?.main?.temp_max),
            tempMin: Math.floor(data?.main?.temp_min),
            city: data?.name,
            country: data?.sys?.country,
            date: dayjs().format('DD-MM-YYYY hh:mm A'),
            weather: data?.weather?.[0].main,
        }
    }, [data])

    return (
        <div
            className={twMerge(
                "flex flex-col relative w-[90%] max-w-[600px] bg-opacity-20 p-6 rounded-xl",
                isLight ? 'text-black bg-white' : 'text-white bg-black',
            )}
        >
            {isLoading && <Loading />}
            <h3>Today's Weather</h3>
            {cleanData && <img
                src={data?.weather?.[0].main === 'Clear' ? SunIcon : CloudIcon}
                className="absolute w-44 aspect-square -top-14 right-4"
            />}
            <WeatherDetails cleanData={cleanData} />
            <div className={twMerge(
                "bg-opacity-15 p-6 rounded-xl mt-6",
                isLight ? 'bg-white' : 'bg-black'
            )}>
                <h4>Search History</h4>
                <HistoryList onSearchClick={onSearchClick}/>
            </div>
        </div>
    )
}

export default WeatherSection
