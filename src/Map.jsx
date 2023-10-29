import React from 'react';
import { MapContainer, TileLayer, Popup, Marker, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react';
import { getColoredPolylineFromActivity } from './controller/itinerary'

function Login({setToken}) {
    var pos = [
        [46.43318, 4.65845],
        [48.43318, 4.65845]
      ];
    const mapZoom = 10;
    const center = [46.43318, 4.65845];
    const [map, setMap] = useState(null);
    const [polylines, setPolylines] = useState([]);

    

    return (
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
	);
}

export default Login;
