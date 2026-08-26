import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface F1Driver {
  id: string;
  name: string;
  nationality: string;
  flag: string;
  championships: number;
  wins: number;
  poles: number;
  podiums: number;
  entries: number;
  years_active: string;
  teams: string;
  bio: string;
  photo_url: string;
}

export interface F1Team {
  id: string;
  name: string;
  full_name: string;
  nationality: string;
  flag: string;
  championships: number;
  wins: number;
  poles: number;
  podiums: number;
  entries: number;
  years_active: string;
  engine: string;
  headquarters: string;
  bio: string;
  logo_url: string;
}

export interface F1Circuit {
  id: string;
  name: string;
  country: string;
  flag: string;
  length: string;
  laps: number;
  lap_record: string;
  record_holder: string;
  gp_name: string;
  first_held: number;
  last_held: number | null;
  races_held: number;
  map_url: string;
}
