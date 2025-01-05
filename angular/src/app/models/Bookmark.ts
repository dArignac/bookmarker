import { Tag } from './Tag';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  date_creation: Date;
  tags: Tag[];
}
