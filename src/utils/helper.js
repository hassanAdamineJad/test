export const onlyUniqueArray = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const calcDistanceByLatLng = (lat, lng, currentLocation) => {
  if (currentLocation) {
    const R = 6371e3; // metres
    const φ1 = (currentLocation?.lat * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat * Math.PI) / 180;
    const Δφ = ((lat - currentLocation?.lat) * Math.PI) / 180;
    const Δλ = ((lng - currentLocation?.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = (R * c) / 1000; // in Km
    return d.toFixed(1);
  } else {
    return false;
  }
};

export const getGeoFindMe = (successCallback, errorCallback) => {
  navigator.geolocation.getCurrentPosition(
    (e) => successGetLocation(e, successCallback),
    (e) => errorGetLocation(e, errorCallback)
  );
};
function successGetLocation(position, callback) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  callback({ lat, lng });
}

function errorGetLocation(error, callback) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      callback("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      callback("Location information is unavailable.");

      break;
    case error.TIMEOUT:
      callback("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      callback("An unknown error occurred.");
      break;
  }
}

export const showEmptyString = (string) => (string === "" ? "unknown" : string);
