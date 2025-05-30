import { Tables } from '../../../database.types';

export type Profile = Pick<Tables<'profiles'>, 'id' | 'name'>;
