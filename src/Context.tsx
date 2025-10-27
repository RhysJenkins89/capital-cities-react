import { createContext, useState, ReactNode } from "react";

interface ContextProps {
    children: ReactNode;
}

// interface userLoggedIn {
//     userIsLoggedIn: boolean;
//     setUserIsLoggedIn: (state: boolean) => void;
// }

type AppContextTypes = {
    userIsLoggedIn: boolean;
    setUserIsLoggedIn: (state: boolean) => void;
    userData: {};
    setUserData: () => void;
};

const AppContext = createContext<AppContextTypes | undefined>(undefined);

const AppContextProvider: React.FC<ContextProps> = ({ children }) => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState();

    return (
        <AppContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn, userData, setUserData }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };
