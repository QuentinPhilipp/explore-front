import React from 'react';
import { MapContainer, TileLayer, Popup, Marker, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react';
import { getColoredPolylineFromActivity } from './controller/itinerary'

function Dashboard() {
    const mapZoom = 10;
    const center = [46.43318, 4.65845];
    const [map, setMap] = useState(null);
    const [polylines, setPolylines] = useState([]);

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
            const data = await (await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/ping`,
            {
                credentials: 'include'
            })).json()
            console.log(data)
        } catch (err) {
            console.log(err.message)
        }
    } 
    const fetchItinerary = async () => {
        try {
            setPolylines([]);

            const data = await (await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/routes/`,
            {
                credentials: 'include'
            })).json()

            const poly_list = data.map(activity => getColoredPolylineFromActivity(activity))
            setPolylines(poly_list);
            map.invalidateSize();

        } catch (err) {
            console.log(err.message)
        }
    } 

    return (
		<div className='flex items-center justify-center w-screen h-screen bg-gray-900 '>
			<div className='w-3/12 p-6 mx-auto space-y-10 text-center bg-gray-800 rounded text-white'>
				<h1 className='text-4xl'>Ride out</h1>
				<a
					href={`https://www.strava.com/oauth/authorize?client_id=${import.meta.env.VITE_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_STRAVA_LOGIN_REDIRECT_URL}&approval_prompt=force&scope=${import.meta.env.VITE_STRAVA_SCOPE}`}
					className='block text-3xl text-blue-300 underline'
				>
					Login
				</a>
                <div className='flex flex-col gap-5'>
                <button 
					onClick={ping}
				>
					Ping
				</button >
                <button 
					onClick={handleClickActivity}
				>
					Get activity
				</button >
                <button 
					onClick={fetchItinerary}
				>
					Get route
				</button >
                </div>
                <MapContainer 
                center={center} 
                zoom={mapZoom} 
                scrollWheelZoom={true}
                ref={setMap}
                zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[46.43318, 4.65845]}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    {polylines.map((polylineData, idx) => 
                        <Polyline 
                        key={`polyline-${idx}`} 
                        pathOptions={
                            {
                                color: polylineData.color,
                                opacity: polylineData.opacity
                            }
                        } 
                        positions={polylineData.positions}/>
                    )}
                </MapContainer>

			</div>
		</div>
	);
}

export default Dashboard;
