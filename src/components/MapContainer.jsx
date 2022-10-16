import { useState, useEffect } from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react"
import axios from 'axios';
import img from '../img.svg'
import { Slider } from '@mui/material';
import personImg from '../person.svg'


export function MapContainer({ google }) {

  const [data, setData] = useState([]);
  const [time, setTime] = useState('00');
  const [peopleWithTime, setPeopleWithTime] = useState([]);
  const [value, setValue] = useState(0);

  const getData = async () => {
    await axios.get("http://127.0.0.1:5000/places").then((resp) => {
      setData(resp.data);
    })
  }

  const getLocationsAtTime = async (t) => {
    await axios.get(`http://127.0.0.1:5000/people/place/${t}`).then((resp) => {
      setPeopleWithTime(resp.data)
    })
  }

  const getIndividualLat = (lat, i) => {
    let r = 0.0003
    let angle_interval = 2 * Math.PI / 15
    if (i > 15) {
      r = 0.0005
      angle_interval = 2 * Math.PI / 25
    } if (i > 40) {
      r = 0.0007
      angle_interval = 2 * Math.PI / 30
    }
    let new_lat = lat + r * Math.sin(angle_interval * i)

    return new_lat
  }

  const getIndividualLon = (lon, i) => {
    let r = 0.0003
    let angle_interval = 2 * Math.PI / 15
    if (i > 15) {
      r = 0.0005
      angle_interval = 2 * Math.PI / 25
    } if (i > 40) {
      r = 0.0007
      angle_interval = 2 * Math.PI / 30
    }

    let new_long = lon + r * Math.cos(angle_interval * i)
    return new_long
  }

  useEffect(() => {
    getData();
    getLocationsAtTime(time);
  }, [time])

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
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);

  const changeValue = (event, value) => {
    setValue(value);

    let x = (Math.floor(value / 60) * 100) + (value % 60) + 300
    let timeStr = x.toString();
    if (timeStr.length < 4) {
        timeStr = "0" + timeStr;
    }
    setTime(timeStr);
  };

  return (
    <div className='absolute w-full h-screen '>
      <div className='fixed top-[95%] left-1/4 w-1/2 z-20 px-6 bg-gray-600 opacity-80 rounded-xl'>
        <Slider
          aria-label="Time"
          defaultValue={0}
          value={value}
          valueLabelDisplay="auto"
          onChange={changeValue}
          step={1}
          min={0}
          max={1500}
        />
      </div>

      <Map
        google={google}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
        className={'map'}
        initialCenter={{ lat: 55.871843, lng: -4.288341 }}
        zoom={17.2}
        clickableIcons={false}
        disableDefaultUI={true}

      >
        {data.map((place, index) => (
          <Marker
            key={index}
            name={place.name}
            position={{ lat: place.location.latitude, lng: place.location.longitude }}
            onClick={(props, marker) => {
              setSelectedElement(place);
              setActiveMarker(marker);
              console.log(peopleWithTime)
            }}
            icon={{
              url: img,
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(50, 50)
            }}
          />
        ))}

        {data.map((place, index) => (peopleWithTime.filter((person) => { return person.PlaceName === place.name }).map((personMarker, index2) => (


          <Marker
            key={index2}
            name={place.name}
            position={{ lat: getIndividualLat(place.location.latitude, index2), lng: getIndividualLon(place.location.longitude, index2) }}
            onClick={(props, marker) => {
              setSelectedPerson(personMarker);
              setActiveMarker(marker);
            }}
            icon={{
              url: personImg,
              anchor: new google.maps.Point(10, 10),
              scaledSize: new google.maps.Size(10, 10)
            }}
          />
        ))))}



        {selectedElement ? (
          <InfoWindow
            visible={showInfoWindow}
            marker={activeMarker}
            onCloseClick={() => {
              setSelectedElement(null);
            }}
          >
            <div>
              {peopleWithTime.filter((person) => { return person.PlaceName === activeMarker.name }).map((person, index) => (
                <h1>{person.StudentName}</h1>
              ))}
            </div>
          </InfoWindow>
        ) : null}

        {selectedPerson ? (
          <InfoWindow
            visible={showInfoWindow}
            marker={activeMarker}
            onCloseClick={() => {
              setSelectedElement(null);
            }}
          >
            <div>
              <h1></h1>
            </div>
          </InfoWindow>
        ) : null}

      </Map>

    </div >
  )
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCAH_U_yco9V4239cbeTM2RdIu_piutu5w"
})(MapContainer);
