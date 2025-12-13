import { ApiContext } from './ApiContext'

export const ApiProvider = ({ children, apiBaseUrl }: { children: React.ReactNode, apiBaseUrl: string }) => {
   return (
      <ApiContext.Provider value={{ apiBaseUrl }}>
         {children}
      </ApiContext.Provider>
   )
}