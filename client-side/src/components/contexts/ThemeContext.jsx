import { createContext, useState } from 'react'


export const ThemeContext = createContext(null)

export default function ThemeContextProvider({children}){

    const [dark, setDark] = useState('false')

    return (
        <ThemeContext.Provider value={{dark, setDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

