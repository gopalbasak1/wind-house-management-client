import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationDetails = () => {
  const position = [51.505, -0.09]; 

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Our Location</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              Wind House is located in the heart of the city, providing easy access to major landmarks and public transport.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              Address: 123 Main Street, Cityville, ST 12345
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              How to get here:
              <ul className="list-disc list-inside">
                <li>By Car: Ample parking is available on-site.</li>
                <li>By Bus: The nearest bus stop is just a 5-minute walk away.</li>
                <li>By Train: The main train station is a 15-minute drive from our location.</li>
              </ul>
            </p>
          </div>
          <div className="md:w-1/2 h-64 md:h-auto">
            <MapContainer center={position} zoom={13} className="h-full w-full rounded-lg shadow-md">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  Wind House Apartments <br /> 123 Main Street, Cityville
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
