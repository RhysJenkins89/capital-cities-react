import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
    return <h1>Capital cities</h1>;
};

export default App;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
