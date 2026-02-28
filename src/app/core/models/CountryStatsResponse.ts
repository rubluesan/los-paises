import { CountryStats } from './CountryStats';

export interface CountryStatsResponse {
  data: CountryStats[];
}

export interface CountryByIdResponse {
  data: CountryStats;
}
