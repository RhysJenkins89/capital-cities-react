import { createContext, useState, ReactNode } from "react";

interface ContextProps {
    children: ReactNode;
}

interface userLoggedIn {
    userIsLoggedIn: boolean;
    setUserIsLoggedIn: (state: boolean) => void;
}

const AppContext = createContext<userLoggedIn | undefined>(undefined);

const AppContextProvider: React.FC<ContextProps> = ({ children }) => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };
