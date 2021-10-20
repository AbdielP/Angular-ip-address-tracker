import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

import { PublicIp } from 'src/app/interfaces/public-ip'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private KEY = environment.IPifyKey;
  private URL = 'https://geo.ipify.org/api/v2/country,city?apiKey='
  private fakeip = environment.iptest;

  constructor(private http: HttpClient) { }

  getPublicIp() {
    return this.http.get('https://api.ipify.org?format=json')
    .pipe(map((resp: PublicIp) => {
      return resp['ip'];
    }),(catchError(err => [
      console.log(err)
    ])));
  }

  getIpAddressInfo(publicIp: string) {
    return this.http.get(`${this.URL}at_7SXU1ElscER15BLhHOmTbAZrMqpZD&ipAddress=${publicIp}`)
    .pipe(map((resp: any) => {
      return resp;
    }),(catchError(err => [
      console.log(err)
    ])));
  }

}
