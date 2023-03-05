import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Marker, Map as MapGL } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;

const Map = ({ coordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  return (
    <MapGL
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      initialViewState={{
        longitude: coordinates.long,
        latitude: coordinates.lat,
        zoom: 14,
      }}
    >
      <div className="text-green-400 bg-green-400">
        <Marker
          longitude={coordinates.long}
          latitude={coordinates.lat}
        ></Marker>
      </div>
    </MapGL>
  );
};

export default Map;
