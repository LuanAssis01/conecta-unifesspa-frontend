import { createContext } from 'react'

export interface ApiContextType {
   apiBaseUrl: string
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined)