import { useContext } from "react";
import { AppContext } from "../Context";

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within the AppContextProvider component.");
    }
    return context;
}
