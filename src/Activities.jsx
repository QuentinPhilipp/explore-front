import React, { useEffect, useState } from "react";
import polylineDecoder from 'google-polyline';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';


function Activities() {
    const [activities, setActivities] = useState([]);
    const mapZoom = 10;
    const center = [46.43318, 4.65845];

    useEffect(() => {
        console.log("Exchange code for token")
        fetch(`${import.meta.env.VITE_BACKEND_SERVER}/routes?`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (const activity of data) {
                const decoded_polyline = polylineDecoder.decode(activity.polyline);
                activity.polyline = decoded_polyline;
            }
            console.log(data);
            setActivities(data);
        });
    }, [])

	return (
        <>
        	<h1>Activities</h1>
            <div className="activityContainer">
                {activities.map((activitiy, idx) => 
                <MapContainer 
                center={center} 
                zoom={mapZoom} 
                scrollWheelZoom={true}
                zoomControl={false}
                key={idx}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline positions={activitiy.polyline}/>
                </MapContainer>
                )}
            </div>
        </>
	);
}

export default Activities;