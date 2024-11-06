export type DetailTrip = {
  vendor_id: string;
  trip_distance: number;
  total_amount: number;
};

export type DataTrip = {
  [key: string]: DetailTrip[];
};

export type MapGenerate = {
  startCoords: CoordinateMap;
  endCoords: CoordinateMap;
  routeData: MapTrip;
}

export type MapTrip = {
  distance: number;
  duration: number;
  coordinates: CoordinateMaps[];
  steps: StepMap[];
}

export type CoordinateMaps = {
  [key: string]: CoordinateMap[];
}

export type CoordinateMap = {
  langtitude: number;
  longtitude: number;
}

export type StepMap = {
  instruction: string;
  distance: number;
  duration: number;
  name: string;
}