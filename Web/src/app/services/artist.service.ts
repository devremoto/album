import { Injectable } from '@angular/core';
import { Artist } from '../models/artist';
import { BaseService } from './BaseService';
import { HttpService } from './HttpService';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends BaseService<Artist> {

  constructor(private http: HttpService) {
    super(http);
    this.controller = 'artist';
  }

}
