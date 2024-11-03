export type DetailTrip = {
  vendor_id: string;
  trip_distance: number;
  total_amount: number;
};

export type DataTrip = {
  [key: string]: DetailTrip[];
};
