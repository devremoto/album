import { Injectable } from '@angular/core';
import { AlbumType } from '../models/album-type';
import { BaseService } from './BaseService';
import { HttpService } from './HttpService';

@Injectable({
  providedIn: 'root'
})
export class AlbumTypeService extends BaseService<AlbumType> {

  constructor(private http: HttpService) {
    super(http);
    this.controller = 'albumType';
  }

}
