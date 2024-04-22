export type Result = {
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  addressComponents: {
    shortText: string;
    longText: string;
    types: string[];
  }[];
};

export type FormFields = {
  street_address: string;
  street_number: string;
  city: string;
  suburb: string;
  postal_code: number;
  state: string;
  country: string;
  optional_address?: string;
  sub_state?: string;
};
