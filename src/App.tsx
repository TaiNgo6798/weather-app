import { useEffect, useState } from "react";
import { ThemeContext } from "./contexts/theme"
import Main from "./modules/main";
import { SearchHistoriesContext, SearchHistoriesType } from "./contexts/search-histories";

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [searchHistories, setSearchHistories] = useState<SearchHistoriesType>(null);

  const themeBgClasses = {
    light: 'bg-[url("assets/bg-light.png")]',
    dark: 'bg-[url("assets/bg-dark.png")]',
  }

  useEffect(() => {
    setTheme(localStorage?.getItem('theme') as 'light' || 'light')
    setSearchHistories(JSON.parse(localStorage?.getItem('searchHistories') || '[]'))
  }, [])

  useEffect(() => {
    searchHistories && localStorage?.setItem('searchHistories', JSON.stringify(searchHistories))
  }, [searchHistories])

  useEffect(() => {
    theme && localStorage?.setItem('theme', theme)
  }, [theme])

  const addHistory = (history: SearchHistoriesType) => setSearchHistories((prev: any) => [history, ...prev])
  const removeHistory = (id: number) => setSearchHistories((prev: SearchHistoriesType) => prev && prev.filter((history: any) => history.id !== id))

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
      <SearchHistoriesContext.Provider value={{ 
        searchHistories, 
        addHistory,
        removeHistory
       }}>
        <div className={`${theme && themeBgClasses[theme]} w-screen h-screen`}>
          <Main />
        </div>
      </SearchHistoriesContext.Provider>
      </ThemeContext.Provider>
    </>
  )
}

export default App
