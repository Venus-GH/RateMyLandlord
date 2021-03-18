import React from 'react'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

export class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={{width: '50%', height: '50%'}}
        initialCenter={{
          lat: 40.73061,
          lng: -73.935242
        }}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk'
})(MapContainer)
