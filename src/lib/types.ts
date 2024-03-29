export type Result = {
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  addressComponents: {
    shortText: string;
    longText: string;
  }[];
};
