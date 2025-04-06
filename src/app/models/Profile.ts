import { User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  created_at: Date;
  name: string;
  is_hidden: boolean;
  owner: User;
}
