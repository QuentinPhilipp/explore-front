import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';


function StravaAuth() {
    const navigate = useNavigate();

    const [token, setToken] = useState("")
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code')
    const scope = searchParams.get('scope')

    useEffect(() => {
        console.log("Exchange code for token")
        fetch('http://127.0.0.1:8000/exchange_token?', {
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
        .then((response) => {console.log(response)})
        .then(() => navigate("/"))
    }, [])

	return (
		<div>Wait for redirect</div>
	);
}

export default StravaAuth;
