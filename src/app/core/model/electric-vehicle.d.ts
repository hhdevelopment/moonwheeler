interface ElectricVehicle extends FirebaseDocument {
  brand: string;
  model: string;
  releasedIn: number;
  thumbnail: string;
  description: string;

  weight: number;
  payload: number;
  ipRating: string;

  factorySpeed: number;
  maxSpeed: number;
  distanceMax: number;
  maxSlope: number;

  frontLight: boolean;
  rearLight: boolean;
  turnSignal: boolean;
  horn: boolean;

  batteryType: string;
  batteryCapacity: number;
  chargingTime: number;

  powerRating: number;
  operatingTemperatureLow: number;
  operatingTemperatureTop: number;

  android: boolean;
  ios: boolean;
  connections: string[];
}
