import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline
} from "@react-google-maps/api";

import {  GoogleApiWrapper } from 'google-maps-react';
// import scheduledOrders from "./data.json";

function Maps() {
  const [activeMarker, setActiveMarker] = useState(null);
  let startMarker = null;
  let wayptMarker = [];

var scheduledOrders = [
    { lat: 42.02, lng: -77.01 },
    { lat: 42.03, lng: -77.02 },
    { lat: 41.03, lng: -77.04 },
    { lat: 42.05, lng: -77.02 }
]
//get the first point and put it in a startMarker variable then put the middle points in an array(wayptMarker)
  scheduledOrders.map((item, index, arr) => {
    if (index == 0 || index == arr.length - 1) {
      //Since the start and end point are the same, I only get the start point details in my startMarker variable
      if (index == 0) {
        startMarker = item;
      }
    } else {
      wayptMarker.push(item);
    }
  });

//put your startposition here
  let startPosition = {
    lat: startMarker.order_lat,
    lng: startMarker.order_lng
  };
//put your start name here
  let startName =
    startMarker.customerName + " - " + startMarker.customerAddress;


  let markers =
    scheduledOrders !== undefined &&
    scheduledOrders &&
    wayptMarker.map((item, index) => ({
      id: index + 1,
      name: item.customerName + " - " + item.customerAddress,
      position: {
        lat: Number(item && item.order_lat, 10),
        lng: Number(item && item.order_lng, 10)
      }
    }));


  console.log("@@@markser", scheduledOrders);

  const handleActiveMarker = marker => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = map => {
    const bounds = new window.google.maps.LatLngBounds();
    markers && markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "88vh" }}
    >
      <Polyline
        path={
          scheduledOrders !== undefined &&
          scheduledOrders &&
          scheduledOrders[0] &&
          scheduledOrders.map(item => ({
            lat: Number(item && item.order_lat, 10),
            lng: Number(item && item.order_lng, 10)
          }))
        }
        options={{
          strokeColor: "#07966B",
          strokeOpacity: 1,
          strokeWeight: 2,
          icons: [
            {
              icon: "hello",
              offset: "0",
              repeat: "10px"
            }
          ]
        }}
      />
     {/* I created a marker solely for startMArker where you can customize the  icon for this only marker */}
      {startMarker != null && (
        <Marker
          key="start"
          position={startPosition}
          onClick={() => handleActiveMarker("start")}
          label={{ text: `START`, color: "black" }}
          icon="http://maps.google.com/mapfiles/kml/shapes/arrow.png"
        >
          {activeMarker === "start" ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{startName}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      )}
  {/* The following Marker object will only create markers for the middle points */}
      {markers &&
        markers.map(({ id, name, position }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
            label={{ text: `${id}`, color: "white" }}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{name}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
    </GoogleMap>
  );
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCnCIkAfKRbZOIZUF2WPICuE9nxxUxF7_s')
})(Maps)
