import { Map, GoogleApiWrapper} from 'google-maps-react';
import React from "react";


class ShowRouteMap extends React.Component {
    constructor(props) {
      super(props);
      this.handleMapReady = this.handleMapReady.bind(this);
    }
  
    handleMapReady(mapProps, map) {
      this.calculateAndDisplayRoute(map);
    }
  
      calculateAndDisplayRoute(map) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsDisplay = new window.google.maps.DirectionsRenderer();
      directionsDisplay.setMap(map);
     
  
      const waypoints = this.props.data.map(item =>{
        return{
          location: {lat: item.lat, lng:item.lng},
          stopover: true
        }
      })
      const origin = waypoints.shift().location;
      const destination = waypoints.pop().location;
  
      directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  
    render() {
      return (
        <div className="map-container">
          <Map
            google={this.props.google}
            className={"map"}
            zoom={4}
            // initialCenter={this.props.center}
            onReady={this.handleMapReady}
          />
        </div>
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: ("AIzaSyBcnAApbpvw9JdCVG6zy7GU3UR05lOSJOk")
    
   
})(ShowRouteMap)