import React, {Component} from 'react'
import {
  LoadScript,
  Autocomplete,
  GoogleMap,
  StreetViewPanorama
} from '@react-google-maps/api'
import BuildingResult from './BuildingResult'
import Map from './Map'

const containerStyle = {
  width: '400px',
  height: '400px',
  backgroundColor: 'black'
}

const center = {
  lat: 40.73061,
  lng: -73.935242
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: null,
      lng: null,
      address: '',
      result: false
    }
    this.autocomplete = null
    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  onLoad(autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace()
      this.setState({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address
      })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  handleSubmit() {
    console.log('in handle')
    this.setState({result: true})
  }

  goBack() {
    this.setState({result: false})
  }

  render() {
    const {address, lat, lng, result} = this.state
    return (
      <div>
        {result ? (
          <BuildingResult
            address={address}
            lat={lat}
            lng={lng}
            goBack={this.goBack}
          />
        ) : (
          // <Map />
          <LoadScript
            googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
            libraries={['places']}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              style={containerStyle}
              center={center}
              zoom={10}
            />
            <div>
              <p>Enter an address to get started:</p>
              <Autocomplete
                onLoad={this.onLoad}
                onPlaceChanged={this.onPlaceChanged}
              >
                <input width="100%" />
              </Autocomplete>
              <button onClick={this.handleSubmit}>Enter</button>
            </div>
          </LoadScript>
        )}
      </div>
    )
  }
}

export default Home
