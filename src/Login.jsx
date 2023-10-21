import React from 'react';

function Login() {

    const handleClickActivity = async () => {
        try {
            const data = await (await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/activity/9995298311`, 
            {
                credentials: 'include'
            })).json()
            console.log(data)
        } catch (err) {
            console.log(err.message)
        }
    } 
    const ping = async () => {
        try {
            const data = await (await fetch(`/api/ping`,
            {
                credentials: 'include'
            })).json()
            console.log(data)
        } catch (err) {
            console.log(err.message)
        }
    } 

	return (
		<div className='flex items-center justify-center w-screen h-screen bg-gray-900 '>
			<div className='w-3/12 p-6 mx-auto space-y-10 text-center bg-gray-800 rounded'>
				<h1 className='text-4xl text-white'>Ride out</h1>
				<a
					href={`https://www.strava.com/oauth/authorize?client_id=${import.meta.env.VITE_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_STRAVA_LOGIN_REDIRECT_URL}&approval_prompt=force&scope=${import.meta.env.VITE_STRAVA_SCOPE}`}
					className='block text-3xl text-blue-300 underline'
				>
					Login
				</a>
                <button 
					onClick={handleClickActivity}
				>
					Get activity
				</button >
                <button 
					onClick={ping}
				>
					Ping
				</button >
			</div>
		</div>
	);
}

export default Login;
