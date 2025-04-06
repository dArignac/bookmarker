import { User } from '@supabase/supabase-js';

export interface Tag {
  id: string;
  title: string;
  owner: User;
}
