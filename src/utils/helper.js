export const onlyUniqueArray = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const calcDistanceByLatLng = (lat, lng) => {
  const currentLocation = { lat: 52.384306, lng: 4.844736 }; // ToDo
  const R = 6371e3; // metres
  const φ1 = (currentLocation.lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat * Math.PI) / 180;
  const Δφ = ((lat - currentLocation.lat) * Math.PI) / 180;
  const Δλ = ((lng - currentLocation.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = (R * c) / 1000; // in Km
  return d.toFixed(1) + " km";
};
