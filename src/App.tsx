import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./Context";
import Home from "./Home";

const queryClient: QueryClient = new QueryClient();

const App = () => {
    return (
        <AppContextProvider>
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        </AppContextProvider>
    );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(React.createElement(App));
