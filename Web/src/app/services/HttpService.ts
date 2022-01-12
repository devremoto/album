import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  options: any;
  config: any;

  constructor(private http: HttpClient) {
  }

  prepareUrl(url, usePrefix: boolean = true): string {
    if (url.indexOf('://') === -1 && usePrefix) {
      return environment.apiAddress + url;
    }
    return url;
  }

  upload(files, obj: any) {
    const formData = this.loadData(files, obj);
    return this.http.post(`${this.config.siteUrl}/file/upload`, formData);
  }

  upload64(data: string, obj: any) {
    const formData = new FormData();
    if (obj) {
      formData.append('model', JSON.stringify(obj));
    }
    formData.append('file', data);
    return this.http.post(`${this.config.siteUrl}/file/upload`, formData);
  }

  apiUpload(url: string, files, obj: any) {
    const formData = this.loadData(files, obj);
    return this.post<any>(url, formData);
  }

  apiUpload64(url: string, data: string, name: string, obj?: any) {
    const formData = new FormData();
    if (obj) {
      formData.append('model', JSON.stringify(obj));
    }
    formData.append(name || 'file0', data);
    return this.post<any>(url, formData);
  }

  removeFile(fileName) {
    return this.get(`${this.config.siteUrl}/file/remove/${fileName}`);
  }

  image(fileName: string, controller, w?: number, h?: number, base64: boolean = false) {
    return this.get(`${this.config.siteUrl}/file/image/${fileName}`, {
      w: w || 0,
      h: h || 0,
      base64,
      controller
    });
  }

  apiImage(fileName: string, controller, w?: number, h?: number, base64: boolean = false) {
    return this.get(`${this.config.apiAddress}/file/image/${fileName}`, {
      w: w || 0,
      h: h || 0,
      base64,
      controller
    });
  }

  private loadData(files, obj: any) {
    const data = new FormData();
    if (obj) {
      data.append('model', JSON.stringify(obj));
    }
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        data.append('file' + i, files[i]);
      }
    }
    return data;
  }

  create<T>(url: string, object: any) {
    return this.post<T>(url, object);
  }

  add<T>(url: string, object: any) {
    return this.post<T>(url, object);
  }

  post<T>(url: string, object: any) {
    return this.http.post<T>(this.prepareUrl(url), object);
  }

  save<T>(url: string, object: any, edit: boolean = false) {
    if (edit) {
      return this.update<T>(url, object);
    }

    return this.post<T>(url, object);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(this.prepareUrl(url));
  }

  update<T>(url: string, object: any) {
    return this.put<T>(url, object);
  }

  put<T>(url: string, object: any) {
    return this.http.put<T>(this.prepareUrl(url), object);
  }

  get<T>(url: string, params?: any, usePrefix: boolean = true) {
    return this.http.get<T>(this.prepareUrl(url + (params ? this.param(params) : ''), usePrefix), this.options);
  }

  getLink(url: string, params?: any, usePrefix: boolean = true) {
    return this.prepareUrl(url + (params ? this.param(params) : ''), usePrefix);
  }

  // param(obj) {
  //   return stringify(parse(JSON.stringify(obj)))
  // }
  param(obj, parent?: any, param?: URLSearchParams) {
    const params = param || new URLSearchParams();
    for (const key in obj) {
      if (parent) {
        params.delete(parent);
        if (obj[key]) {
          params.set(`${parent}.${key}`, obj[key]);
        }
      }
      else if (typeof obj[key] === 'object') {
        params.set(key, this.param(obj[key], key, params));
      } else if (obj[key] && !params.has(key)) {
        params.set(key, obj[key]);
      }
    }
    if (params.toString() && !parent) {
      return '?' + params.toString();
    }
    return '';
  }
}
