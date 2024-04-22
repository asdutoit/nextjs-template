import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Result, FormFields } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToCssHsl(hex: string, valuesOnly = true) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error("Invalid hex color");
  }
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  let cssString = "";
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  let l = (max + min) / 2;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = 0;
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  cssString = `${h} ${s}% ${l}%`;
  cssString = !valuesOnly ? `hsl(${cssString})` : cssString;

  return cssString;
}

export function UpdateCSSVariable(e: React.ChangeEvent<HTMLInputElement>) {
  const color = e.target.value;
  const name = e.target.name;
  const HSL = hexToCssHsl(color);
  console.log("HSL", HSL);
  document.documentElement.style.setProperty("--base", `${color}`);
  document.documentElement.style.setProperty(`--${name}`, `${HSL}`);
}

export function UpdateCSSVariables(theme: any, mode: string | undefined) {
  let updatedMode;
  if (!mode) {
    updatedMode = "system";
    // console.log("Radius", theme.cssVars);
  } else {
    updatedMode = mode;
    // console.log("Radius", theme.cssVars);
  }
  const cssVars = theme.cssVars[updatedMode];
  for (const key in cssVars) {
    document.documentElement.style.setProperty(`--${key}`, `${cssVars[key]}`);
  }
}

export const myLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  if (quality) {
    return `https://${process.env.NEXT_PUBLIC_DISTRIBUTION}.cloudfront.net/${src}?format=auto&quality=${quality}&width=${width}`;
  } else
    return `https://${process.env.NEXT_PUBLIC_DISTRIBUTION}.cloudfront.net/${src}?format=auto&width=${width}`;
};

export const mapAddressComponentToFormField = (result: Result): FormFields => {
  // Create a mapping between address component types and form fields
  const typeToFormField: { [key: string]: keyof FormFields } = {
    street_number: "street_number",
    route: "street_address",
    locality: "city",
    sublocality: "suburb",
    neighborhood: "suburb",
    administrative_area_level_1: "state",
    administrative_area_level_2: "sub_state",
    subpremise: "optional_address",
    country: "country",
    postal_code: "postal_code",
  };

  // Initialize the form fields
  let formFields: FormFields = {
    street_address: "",
    city: "",
    street_number: "",
    suburb: "",
    postal_code: 0,
    state: "",
    country: "",
    optional_address: "",
    sub_state: "",
  };

  // Loop through the address components
  for (const addressComponent of result.addressComponents) {
    // Loop through the types of the current address component
    for (const type of addressComponent.types) {
      // If the current type has a corresponding form field
      if (type in typeToFormField) {
        if (type === "administrative_area_level_1" || type === "country") {
          // Set the form field to the short text of the current address component
          console.log(
            "formFields[typeToFormField[type]]",
            formFields[typeToFormField[type]]
          );
          formFields[typeToFormField[type]] = addressComponent.shortText;
        } else {
          // Set the form field to the long text of the current address component
          formFields[typeToFormField[type]] = addressComponent.longText;
        }
      }
    }
  }

  return formFields;
};
