import { AlbumType } from './album-type';
import { Artist } from './artist';

export class Album {
  id?: string;
  artist?: Artist;
  artistId?: string;
  albumType?: AlbumType;
  albumTypeId?: string;
  title?: string;
  stock?: number;
}
