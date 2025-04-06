import { User } from '@supabase/supabase-js';
import { Tag } from './Tag';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  date_creation: Date;
  owner: User;
  tags: Tag[];
}
