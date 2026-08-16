import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
}

interface AppContextValue {
    userIsLoggedIn: boolean;
    setUserIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    userData: UserData;
    setUserData: Dispatch<SetStateAction<UserData>>;
}

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContext = createContext<AppContextValue | null>(null);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({ firstName: "", lastName: "", email: "" });

    const value: AppContextValue = {
        userIsLoggedIn,
        setUserIsLoggedIn,
        userData,
        setUserData,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
