import { IRide, Pointed } from 'src/models/ride';

export const SortTrips = (customerTrips: IRide[], driverTrips: IRide[]) => {
  const pointedArray: Pointed[] = [];
  customerTrips.forEach((item) => {
    driverTrips.forEach((driver) => {
      pointedArray.push({
        ...item,
        points: getPointsMap(item, driver),
        driverName: driver.name,
      });
    });
  });
  return pointedArray.sort((a: Pointed, b: Pointed) => {
    return b.points - a.points;
  });
};

const getPointsMap = (trip1: IRide, trip2: IRide) => {
  const Obj = {
    distance: getDistancePoints(
      getDistance(
        trip1.locationLatitude,
        trip1.locationLongitude,
        trip2.locationLatitude,
        trip2.locationLongitude,
      ),
    ),
    rating: trip1.rating >= trip2.rating ? 2 : 0,
    numberOfRides:
      trip1.numberOfRides <= 2 && trip2.numberOfRides >= 3
        ? 5
        : trip1.numberOfRides > 2 && trip2.numberOfRides < 3
        ? 2
        : 0,
  };
  const totalPoints = Object.values(Obj).reduce((acc: number, i: number) => {
    return acc + i;
  }, 0);

  return totalPoints;
};

const getDistancePoints = (distance: number) => {
  return distance <= 3 ? 7 : distance <= 5 ? 3 : 0;
};

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const lat11 = toRad(lat1);
  const lat22 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat11) * Math.cos(lat22);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d / 1000;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}
