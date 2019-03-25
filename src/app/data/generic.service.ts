import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Configuration } from '../config/mega.config';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private url: string;

  constructor(private _http: HttpClient, private configuration: Configuration) {
    this.url = configuration.api;
  }

  get path() {
    return this.url;
  }

  get http() {
    return this._http;
  }

  one(path: string, id: number): GenericService {
    const restangular = this.clone();
    restangular.url += (path ? '/' + path : '') + '/' + id;
    return restangular;
  }

  all(path: string): GenericService {
    const restangular = this.clone();
    restangular.url = restangular.url + '/' + path;
    return restangular;
  }

  get(): Observable<Response> {
    return this._http.get(this.url).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => this.onError(res)));
  }

  post(obj?: any): Observable<Response> {
    return this._http.post(this.url, obj).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => this.onError(res)));
  }

  put(obj: any): Observable<Response> {
    const clone = Object.assign({}, obj);
    delete clone['_restangular'];
    return this._http.put(this.url, clone).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => this.onError(res)));
  }

  delete(): Observable<Response> {
    return this._http.delete(this.url).pipe(
      map((response) => {
        return response as any;
      }),
      catchError((res) => this.onError(res)));
  }

  clone(): GenericService {
    return new GenericService(this._http, { api: this.url });
  }

  onError(error: any) {
    return throwError(error.message || error);
  }
}
