import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import SearchIconDark from '../../assets/search-icon-dark.svg'
import SearchIconLight from '../../assets/search-icon-light.svg'
import TrashIconDark from '../../assets/trash-icon-dark.svg'
import TrashIconLight from '../../assets/trash-icon-light.svg'
import CircleButton from '../../components/cirle-button'
import { SearchHistoriesContext, SearchHistoryItem } from '../../contexts/search-histories'
import { ThemeContext } from '../../contexts/theme'

const HistoryList = ({
    onSearchClick
}: {
    onSearchClick?: (data: SearchHistoryItem) => any
}) => {
    const { searchHistories, removeHistory } = useContext(SearchHistoriesContext)
    const { theme } = useContext(ThemeContext)
    const isLight = theme === 'light'

    return (
        <div
            className='max-h-[50vh] overflow-y-auto mt-4'
        >
            {searchHistories?.map((h: SearchHistoryItem) => {
                return (
                    <div 
                    key={h.id}
                    className={twMerge(
                        "flex bg-opacity-20 rounded-xl mt-2 py-3 px-3 text-xs gap-2 items-center hover:bg-opacity-50 hover:cursor-pointer",
                        isLight ? 'bg-white' : 'bg-black'
                    )}
                    >
                        <p>{h.text}</p>
                        <p className="ml-auto opacity-50">{h.date}</p>
                        <CircleButton
                            className={twMerge("p-2 border", isLight ? 'bg-opacity-100 border-transparent' : 'bg-opacity-0 opacity-60')}
                        onClick={() => onSearchClick?.(h)}
                        >
                            <img src={isLight ? SearchIconDark : SearchIconLight} className="w-3 aspect-square" />
                        </CircleButton>
                        <CircleButton
                            className={twMerge("p-2 border", isLight ? 'bg-opacity-100 border-transparent' : 'bg-opacity-0 opacity-60')}
                            onClick={() => removeHistory(h.id)}
                        >
                            <img src={isLight ? TrashIconDark : TrashIconLight} className="w-3 aspect-square" />
                        </CircleButton>
                    </div>
                )
            })}
        </div>
    )
}

export default HistoryList