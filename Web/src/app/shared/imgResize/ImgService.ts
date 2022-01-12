import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/BaseService';
import { HttpService } from 'src/app/services/HttpService';

@Injectable()
export class ImgService extends BaseService<string> {
  controller: string;
  constructor(http: HttpService) {
    super(http);
    this.controller = '';
  }
}
