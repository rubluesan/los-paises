import { ProfileData } from '../ProfileData';

export interface Review {
  id: string;
  country_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: ProfileData;
}
