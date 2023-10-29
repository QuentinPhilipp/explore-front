import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';


function StravaAuth() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code')
    const scope = searchParams.get('scope')

    useEffect(() => {
        console.log("Exchange code for token")
        fetch(`${import.meta.env.VITE_BACKEND_SERVER}/exchange_token?`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                scope: scope
            }),
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("user_id", data)
            navigate("/");
        });
    }, [])

	return (
		<div>Wait for redirect</div>
	);
}

export default StravaAuth;
