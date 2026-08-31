import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./Context";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home";
import UserRegister from "./UserRegister";
import UserLogin from "./UserLogin";
import EmailTest from "./EmailTest";

const queryClient: QueryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/signin" element={<UserLogin />} />
            <Route path="/email" element={<EmailTest />} />
          </Routes>
        </QueryClientProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(React.createElement(App));
