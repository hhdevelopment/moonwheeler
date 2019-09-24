interface ElectricUnicycle {
  android: Iv<boolean>;
  'battery-capacity': Iv<string>;
  brand: Iv<string>;
  'charging-time': Iv<number>;
  'distance-max': Localized<number>;
  'distance-min': Localized<number>;
  'factory-speed': Localized<number>;
  'front-light': Iv<boolean>;
  gap: Localized<number>;
  horn: Iv<boolean>;
  id: Iv<string>;
  input: Iv<string>;
  ios: Iv<boolean>;
  'ip-rating': Iv<string>;
  'max-slope': Iv<number>;
  'max-speed': Localized<number>;
  model: Iv<string>;
  'operating-temperature-low': Localized<number>;
  'operating-temperature-top': Localized<number>;
  output: Iv<string>;
  payload: Iv<number>;
  'power-rating': Iv<number>;
  'rear-light': Iv<boolean>;
  'tire-pressure': Iv<number>;
  'tire-size': Iv<number>;
  'turn-signal': Iv<boolean>;
  weight: Iv<number>;
}

interface Localized<T> {
  'fr-FR': T;
  'en-US': T;
}

interface Iv<T> {
  iv: T;
}
