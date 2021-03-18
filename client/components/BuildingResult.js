import React from 'react'
import {GoogleMap, LoadScript, StreetViewPanorama} from '@react-google-maps/api'

const BuildingResult = props => {
  const {address, lat, lng, goBack} = props

  return (
    <div>
      <a href="#" onClick={goBack}>
        Back
      </a>
      <h2>{address}</h2>
      <LoadScript
        googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={{width: '400px', height: '400px'}}
          // center={center}
          zoom={14}
        >
          <StreetViewPanorama
            // address={this.state.address}
            position={{lat, lng}}
            visible={true}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default BuildingResult
