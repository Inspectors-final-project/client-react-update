import React from "react";
import ShowRouteMap from "./ShowRouteMap";
import axios from 'axios';
import { useState } from 'react';

export default function MapContainer(){
    const[rows,setrows]=useState(null);
    // const [id, setid] =useState({'id':null});
    React.useEffect(async()=>{
         let id={'pass':10};
        //  id.id='10';
        //  setid({ ...id });
        const promise = await axios.post("https://localhost:44314/api/Result/PostResult",id );
        
         console.log(promise.data);
        
        
  
        let x=promise.data;
        let arr=[];
        console.log(x);
        // debugger;
        console.log(Object.values(x));
        Object.values(x).forEach(element => {
          console.log(element);
          // debugger;
        arr.push( { lat:element.stopLat,lng:element.stopLon})
  });
  console.log(arr);
  debugger;
  setrows(arr);
  
      },[])
    return(
 
          rows&& <ShowRouteMap  data={rows}/>   

    )
}