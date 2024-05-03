import dayjs from 'dayjs'
import { useCallback, useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import SearchIcon from '../assets/search-icon-light.svg'
import Input from '../components/input'
import { SearchHistoriesContext } from '../contexts/search-histories'
import { ThemeContext } from '../contexts/theme'

const Search = ({
  onSearch,
  searchText
}: {
  onSearch: (text: string) => any,
  searchText?: string
}) => {
  const { theme } = useContext(ThemeContext)
  const isLight = theme === 'light'

  const { addHistory } = useContext(SearchHistoriesContext)
  const [localSearchText, setLocalSearchText] = useState(searchText || '')

  useEffect(() => {
    setLocalSearchText(searchText || '')
  }, [searchText])

  const handleSearch = useCallback(() => {
    if (localSearchText) {
      onSearch(localSearchText)
      addHistory({
        id: Date.now(),
        text: localSearchText,
        date: dayjs().format('DD-MM-YYYY hh:mm A')
      })
    }
  }, [onSearch, localSearchText, addHistory])

  return (
    <div className='flex w-[90%] max-w-[600px] justify-center gap-2'>
      <Input
        value={localSearchText}
        placeholder='Country'
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
        onChange={(e: any) => setLocalSearchText(e.target.value)}
      />
      <div className={twMerge(
        'w-10 h-10 rounded-xl bg-opacity-20 hover:bg-opacity-40 text-white flex justify-center items-center hover:cursor-pointer bg-black',
        isLight ? 'bg-opacity-20' : 'bg-opacity-50'
      )}
        onClick={handleSearch}
      >
        <img src={SearchIcon} className='text-white' />
      </div>
    </div>
  )
}

export default Search