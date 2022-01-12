import { Injectable } from '@angular/core';
import { Album } from '../models/album';
import { BaseService } from './BaseService';
import { HttpService } from './HttpService';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseService<Album> {

  constructor(private http: HttpService) {
    super(http);
    this.controller = 'album';
  }

}
