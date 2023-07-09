export interface Data {
  result: WeatherResp | null;
  query: string;
}

export interface WeatherResp {
  location: WeatherLocation;
  current: WeatherCurrent;
}

export interface WeatherLocation {
  name: string;
  country: string;
}

export interface WeatherCurrent {
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  humidity: number;
  feelslike_c: number;
  precip_mm: number;
  wind_kph: number;
  uv: number;
  gust_kph: number;
}

export interface WeatherCondition {
  icon: string;
  text: string;
  code: number;
}
