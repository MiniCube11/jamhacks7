import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { events } from '@/data/events';

export default function Map() {
    const [geoData, setGeoData] = useState({ lat: 43.4723, lng: -80.5449 });

    const center = {lat: geoData.lat, lng: geoData.lng};

    return (
        <MapContainer className='w-[calc(100vw-320px-20px)] h-[calc(100vh-128px-10px)]' center={center} zoom={17} scrollWheelZoom={true}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* {geoData.lat && geoData.lng && (
                <Marker position={{lat: geoData.lat, lng: geoData.lng}}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )} */}
            {events.map(event => (
                <Marker position={{lat: event.latitude, lng: event.longitude}}>
                    <Popup>
                        <p>{event.name}</p>
                        <p>{event.location}</p>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                    </Popup>
                </Marker>
            ))}
            {/* <ChangeView coords={center} /> */}
        </MapContainer>
    )
}