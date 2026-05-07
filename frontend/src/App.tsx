import React from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiClient} from "./api/ApiClient.ts";
import {Loading} from "./components/Loading.tsx";
import {ErrorPage} from "./components/error/ErrorPage.tsx";
import {FishContext} from "./context/FishContext.ts";
import {NavLink, Outlet, useNavigate} from "react-router";

export const App: React.FunctionComponent = () => {
  const [lookup, setLookup] = React.useState<string>("");

  const navigate = useNavigate();

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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/pirate/" + lookup);
  };

  return <>
    <FishContext value={data ?? []}>
      <header className="container">
        <img src="https://placehold.co/1200x200" alt="Logo" className="w-100"/>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              Sea of Fishing
            </NavLink>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/ranking" className="nav-link">Ranking</NavLink>
                </li>
              </ul>
            </div>

            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  defaultValue={lookup}
                  onChange={(e) => setLookup(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </header>

      <div className="container mt-5">
        <Outlet/>
      </div>
    </FishContext>
  </>
}
