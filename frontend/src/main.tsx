import React from "react";
import {createRoot} from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {App} from "./App.tsx";
import {Loading} from "./components/Loading.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import {FrontPage} from "./pages/FrontPage.tsx";
import {NotFound} from "./pages/NotFoundPage.tsx";
import {PiratePage} from "./pages/PiratePage.tsx";

const rootElement = document.getElementById("root");

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <FrontPage/>,
            },
            {
                path: "pirate",
                children: [
                    {
                        index: true,
                        element: <Navigate to=".."/>,
                    },
                    {
                        path: ":pirate",
                        element: <PiratePage/>,
                    },
                ],
            },
            {
                path: "*",
                element: <NotFound/>,
            },
        ],
    },
]);

if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <React.Suspense fallback={<Loading fullPage={true}/>}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router}/>
                </QueryClientProvider>
            </React.Suspense>
        </React.StrictMode>
    )
} else {
    alert("Could not render react application: Root element does not exist!");
}
