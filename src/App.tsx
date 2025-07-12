import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./Context";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home";
import UserRegister from "./UserRegister";

const queryClient: QueryClient = new QueryClient();

const App = () => {
    return (
        <BrowserRouter>
            <AppContextProvider>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<UserRegister />} />
                        <Route path="/signin" element={<p>This is the /signin route.</p>} />
                    </Routes>
                </QueryClientProvider>
            </AppContextProvider>
        </BrowserRouter>
    );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(React.createElement(App));
