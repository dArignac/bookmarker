import { Tables } from '@core/services/supabase/database.types';

export type Profile = Pick<Tables<'profiles'>, 'id' | 'name'>;
