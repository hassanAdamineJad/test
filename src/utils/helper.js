export const onlyUniqueArray = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const calcDistanceByLatLng = (lat, lng) => {
  const currentLocation = getGeoFindMe();
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
};

export const getGeoFindMe = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      return { lat, lng };
    });
  } else {
    return { lat: 0, lng: 0 };
  }
};

export const showEmptyString = (string) => (string === "" ? "unknown" : string);
