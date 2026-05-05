import React from "react";
import {createRoot} from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {App} from "./App.tsx";
import {Loading} from "./components/Loading.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <React.Suspense fallback={<Loading fullPage={true}/>}>
                <App/>
            </React.Suspense>
        </React.StrictMode>
    )
} else {
    alert("Could not render react application: Root element does not exist!");
}
