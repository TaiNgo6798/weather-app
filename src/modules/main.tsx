import { useState } from 'react'
import ThemeSwitch from '../components/theme-switch'
import Search from './search'
import WeatherSection from './weather-section'
import { SearchHistoryItem } from '../contexts/search-histories'

const Main = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <div className={`flex flex-col justify-center items-center py-6 text-sm gap-20`}>
      <ThemeSwitch className='absolute bottom-6 right-6'/>
      <Search onSearch={(text: string) => setSearchText(text)} searchText={searchText}/>
      <WeatherSection searchText={searchText} onSearchClick={(data: SearchHistoryItem) => setSearchText(data.text)}/>
    </div>
  )
}

export default Main