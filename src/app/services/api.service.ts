import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private KEY = environment.IPifyKey;
  private URL = 'https://geo.ipify.org/api/v2/country,city?apiKey='
  private fakeip = environment.iptest;

  constructor(private http: HttpClient) { }

  getIpAddressInfo() {
    return this.http.get(`${this.URL}at_7SXU1ElscER15BLhHOmTbAZrMqpZD&ipAddress=${this.fakeip}`)
    .pipe(map((resp: any) => {
      // return resp['estado'][0];
      console.log(resp);
    }),(catchError(err => [
      console.log(err)
    ])));
  }

}
