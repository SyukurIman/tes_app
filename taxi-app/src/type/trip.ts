export type DetailTrip = {
  vendor_id: string;
  trip_distance: number;
  total_amount: number;
  pickup_longitude: number;
  pickup_latitude: number;
  dropoff_longitude: number;
  dropoff_latitude: number;
  pickup_datetime: any;
  dropoff_datetime: any;
  rate_code: any;
  passenger_count: number;
};

export type DataTrip = {
  [key: string]: DetailTrip[];
};

export type MapGenerate = {
  startCoords: CoordinateMap;
  endCoords: CoordinateMap;
  routeData: MapTrip;
};

export type MapTrip = {
  distance: number;
  duration: number;
  coordinates: [number, number][];
  steps: StepMap[];
};

export type CoordinateMap = {
  langtitude: number;
  longtitude: number;
};

export type StepMap = {
  instruction: string;
  distance: number;
  duration: number;
  name: string;
};
