import React from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiClient} from "./api/ApiClient.ts";
import {Loading} from "./components/Loading.tsx";
import {ErrorPage} from "./components/error/ErrorPage.tsx";
import {FishContext} from "./context/FishContext.ts";

export const App: React.FunctionComponent = () => {
  const {isFetching, data, error} = useQuery({
    queryKey: ["getFishes"],
    queryFn: () => ApiClient.getFishes(),
  });

  if (isFetching) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <Loading fullPage={true}/>
    </div>
  }

  if (error) {
    return <ErrorPage error={error}/>
  }

  return <>
    <FishContext value={{fishes: data ?? []}}>
      <h1>Sea of Fishing</h1>
    </FishContext>
  </>
}
