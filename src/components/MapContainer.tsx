
// import { Map,  GoogleApiWrapper, InfoWindow,Polygon } from 'google-maps-react';


// function MapContainer(props:any) {

//     const coords = { lat: -21.805149, lng: -49.0921657 };
// //     const stores = useSelector((state) => state.storeReducer.storeData);

// //     const currentStore = useSelector((state) => state.storeReducer.currentStore)
// // console.log(currentStore)
// const triangleCoords = [
//     {lat: 25.774, lng: -80.190},
//     {lat: 18.466, lng: -66.118},
//     {lat: 32.321, lng: -64.757},
//     {lat: 25.774, lng: -80.190}
//   ];
 
//   return(
//     <Map google={props.google}
//         style={{width: '100%', height: '100%', position: 'relative'}}
        
//         zoom={14}>
//         <Polygon
//           paths={triangleCoords}
//           strokeColor="#0000FF"
//           strokeOpacity={0.8}
//           strokeWeight={2}
//           fillColor="#0000FF"
//           fillOpacity={0.35} />
//     </Map>
//   )
// }

// export default GoogleApiWrapper({
//     apiKey: ('AIzaSyCnCIkAfKRbZOIZUF2WPICuE9nxxUxF7_s')
// })(MapContainer)