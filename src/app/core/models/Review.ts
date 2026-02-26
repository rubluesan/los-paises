import { Profile } from '../models/Profile';

export interface Review {
  id: string;
  country_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: Partial<Profile>;
}
