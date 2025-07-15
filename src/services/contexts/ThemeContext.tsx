
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
type Theme = "light" | "dark"

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // Handle SSR by checking if we're on the client side
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("appTheme") as Theme) || "light"
        }
        return "light"
    })

    // Separate state to track if component has mounted (for SSR)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Set initial theme from localStorage after mount
        const savedTheme = localStorage.getItem("appTheme") as Theme
        if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
            setThemeState(savedTheme)
        }
    }, [])

    useEffect(() => {
        if (!mounted) return

        localStorage.setItem("appTheme", theme)

        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme, mounted])

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
    }

    const toggleTheme = () => {
        setThemeState((prev) => (prev === "light" ? "dark" : "light"))
    }

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <ThemeContext.Provider value={{ theme: "light", setTheme: () => { }, toggleTheme: () => { } }}>
                {children}
            </ThemeContext.Provider>
        )
    }

    return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider")
    }
    return context
}
