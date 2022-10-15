import React, { useState, useRef, useEffect } from 'react'
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"
import axios from 'axios';


export function MapContainer({ google }) {

  const [data, setData] = useState({});

  const getData = async () => {
    await axios.get("http://127.0.0.1:5000/places").then((resp) => {
        setData(resp.data);
    })
  }

useEffect(() => {
    getData();
}, [])
  

  return (
    <div className='w-full h-screen overflow-hidden'>
      <div className='w-full h-[200px]'>
          <button onClick={() => console.log(data)}>TEstttt</button>
      </div>
      <Map
        google={google}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={'map'}

        zoom={14}

        disableDefaultUI={true}
      >
        
        <Marker onClick={() => console.log('test')}
          name={'Current location'}
          position={{ lat: 55.8728276, lng: -4.2844698}} />
      </Map>
    </div >
  )
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCAH_U_yco9V4239cbeTM2RdIu_piutu5w"
})(MapContainer);
