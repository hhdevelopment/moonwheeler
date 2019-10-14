interface ElectricScooter extends ElectricVehicle {
  frontTireSize: number;
  frontTireType: 'Inflatable' | 'Full' | 'Other';
  frontTirePressure: number;

  rearTireSize: number;
  rearTireType: 'Inflatable' | 'Full' | 'Other';
  rearTirePressure: number;

  deckLength: number;
}
