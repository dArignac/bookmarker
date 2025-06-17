import { Tables } from '@core/services/supabase/database.types';

export type Bookmark = Pick<Tables<'bookmarks'>, 'id' | 'profile_id' | 'url' | 'title' | 'created_at'>;
