export class IRide {
  id: string;
  name: string;
  locationLatitude: number;
  locationLongitude: number;
  numberOfRides: number;
  rating: string;
}

export class Pointed extends IRide {
  points: number;
  driverName: string;
}
