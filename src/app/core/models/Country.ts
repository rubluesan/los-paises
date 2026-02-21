export interface Country {
  name: {
    common: string;
  };
  cca3: string;
  capital: string[];
  region: string;
  population: number;
  flags: { png: string; alt: string };
  translations: {
    spa: {
      common: string;
    };
  };
}
