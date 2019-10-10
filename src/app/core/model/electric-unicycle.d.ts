interface ElectricUnicycle extends ElectricVehicle {
  gap: number;

  tireSize: number;
  tireType: 'Inflatable' | 'Full' | 'Other';
  tirePressure: number;

}
