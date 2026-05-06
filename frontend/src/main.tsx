import React from "react";
import {createRoot} from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {App} from "./App.tsx";
import {Loading} from "./components/Loading.tsx";

const rootElement = document.getElementById("root");

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <React.Suspense fallback={<Loading fullPage={true}/>}>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </React.Suspense>
        </React.StrictMode>
    )
} else {
    alert("Could not render react application: Root element does not exist!");
}
