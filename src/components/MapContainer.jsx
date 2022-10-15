import { useState, useEffect } from 'react'
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"
import axios from 'axios';
import img from '../img.svg'


export function MapContainer({ google }) {

  const [locationData, setLocationData] = useState([]);

  const getData = async () => {
    await axios.get("http://127.0.0.1:5000/places").then((resp) => {
      setLocationData(resp.data);
    })
  }

  useEffect(() => {
    getData();
  }, [])

  
  const mapStyle = [
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]

  function _mapLoaded(mapProps, map) {
    map.setOptions({
       styles: mapStyle
    })
 }

  return (
    <div className='w-full h-screen overflow-hidden'>
      <Map
        google={google}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
        className={'map'}
        initialCenter={{ lat: 55.871843, lng: -4.288341 }}
        zoom={17}
      clickableIcons={false}
      disableDefaultUI={true}

      >
      {locationData.map((place, index) => (
        <Marker onClick={() => alert(place.name)}
          key={index}
          name={place.name}
          position={{ lat: place.location.latitude, lng: place.location.longitude }}
          icon={{
            url: img,
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(50, 50)
          }}
        />

      ))}
    </Map>
    </div >
  )
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCAH_U_yco9V4239cbeTM2RdIu_piutu5w"
})(MapContainer);
