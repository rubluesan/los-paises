export interface Country {
  name: {
    common: string;
  };
  cca3: string;
  capital: string[];
  region: string;
  population: number;
  flags: { svg: string; alt: string };
  translations: {
    spa: {
      common: string;
    };
  };
  maps: {
    googleMaps: string;
  };
}
