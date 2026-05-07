import React from "react";
import {useNavigate, useSearchParams} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {ApiClient} from "../api/ApiClient.ts";
import {ErrorAlert} from "../components/error/ErrorAlert.tsx";
import {Loading} from "../components/Loading.tsx";

export const RegisterPage: React.FunctionComponent = () => {
    const [params] = useSearchParams();

    const [name, setName] = React.useState<string>(params.get("pirate") ?? "");
    const [rat, setRat] = React.useState<string>("");

    const navigate = useNavigate();

    const {isPending, error, mutate} = useMutation({
        mutationFn: () => ApiClient.registerPirate({
            name: name,
            sot_rat: rat,
        }),
        onSuccess: (data) => {
            navigate("/pirate/" + data.slug);
        },
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    return <>
        <h1>Register a new Pirate</h1>

        <div className="alert alert-info text-center lead py-5 mt-5">
            Help us expand our ranking by registering your pirate
        </div>

        <div className="row">
            <form onSubmit={handleSubmit} className="col-sm-6 offset-sm-3">
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Pirate name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        required={true}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputRat" className="form-label">Access Token</label>
                    <textarea
                        className="form-control"
                        rows={10}
                        id="inputRat"
                        defaultValue={rat}
                        onChange={(e) => setRat(e.target.value)}
                        disabled={isPending}
                        required={true}
                    />
                    <div className="form-text">We'll never share your access token with anyone else.</div>
                </div>

                <div className="d-grid gap-0 mb-3">
                    <button type="submit" className="btn btn-primary">
                        Register pirate
                    </button>
                </div>

                <Loading show={isPending}/>
                {!isPending && <ErrorAlert error={error}/>}
            </form>
        </div>
    </>
}
