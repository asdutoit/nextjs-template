import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
