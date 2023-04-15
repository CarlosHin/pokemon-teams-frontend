import Image from 'next/image';
import React from 'react';

const RouteInfo = ({ route }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{route.name}</h2>
            {route.image && (
                <Image src={route.image} alt={route.name} className="mb-4 rounded-lg" />
            )}
            <p className="mb-4">{route.description}</p>
            <ul className="mb-4">
                {route.start_point && (
                    <li>
                        <strong>Start Point:</strong> {route.start_point}
                    </li>
                )}
                {route.end_point && (
                    <li>
                        <strong>End Point:</strong> {route.end_point}
                    </li>
                )}
                {route.distance && (
                    <li>
                        <strong>Distance:</strong> {route.distance} km
                    </li>
                )}
                {route.aprox_time && (
                    <li>
                        <strong>Approximate Time:</strong> {route.aprox_time} hours
                    </li>
                )}
                {route.starting_elevation && (
                    <li>
                        <strong>Starting Elevation:</strong> {route.starting_elevation} m
                    </li>
                )}
                {route.high_point && (
                    <li>
                        <strong>High Point:</strong> {route.high_point} m
                    </li>
                )}
                {route.difficulty && (
                    <li>
                        <strong>Difficulty:</strong> {route.difficulty}/5
                    </li>
                )}
                <li>
                    <strong>Created At:</strong> {route.created_at}
                </li>
            </ul>
        </div>
    );
};

export default RouteInfo;
