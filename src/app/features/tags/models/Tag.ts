import { Tables } from '@core/services/supabase/database.types';

export type Tag = Pick<Tables<'tags'>, 'id' | 'user_id' | 'name' | 'created_at'>;
