import React from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";

const GoogleSearchBar = (props) => {
  const { onLoad, onPlaceChanged } = props;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk",
    libraries: ["places"],
  });

  const onAutoLoad = React.useCallback(onLoad);

  return (
    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onAutoLoad}>
      <input />
    </Autocomplete>
  );
};

export default GoogleSearchBar;
