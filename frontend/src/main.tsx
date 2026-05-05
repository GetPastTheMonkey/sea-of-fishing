import React from "react";
import {createRoot} from "react-dom/client";
import {App} from "./App.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
} else {
    alert("Could not render react application: Root element does not exist!");
}
