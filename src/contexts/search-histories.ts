import { createContext } from 'react';

export type SearchHistoryItem = {
    id: number
    text: string
    date: string
}
export type SearchHistoriesType = SearchHistoryItem[] | null
export const SearchHistoriesContext = createContext<
{
    searchHistories: SearchHistoriesType, 
    addHistory: any,
    removeHistory: any
}
>({
    searchHistories: [],
    addHistory: () => {},
    removeHistory: () => {},
});
