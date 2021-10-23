import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PublicIp } from 'src/app/interfaces/public-ip';
import { DetailsIp } from 'src/app/interfaces/details-ip';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private KEY = environment.IPifyKey;
  private URL = 'https://geo.ipify.org/api/v2/country,city?apiKey=';

  constructor(private http: HttpClient, private errorService: ErrorHandlerService) { }

  getPublicIp(): Observable<PublicIp> {
    return this.http.get('https://api.ipify.org?format=json')
    .pipe(map((resp: string) => {
      return resp['ip'];
    }),(catchError(err => [
      this.errorService.simpleErrorHandler(err)
    ])));
  }

  getIpAddressInfo(publicIp: PublicIp): Observable<void | DetailsIp> {
    return this.http.get(`${this.URL}at_7SXU1ElscER15BLhHOmTbAZrMqpZD&ipAddress=${publicIp}`)
    .pipe(map((resp: DetailsIp) => {
      const details: DetailsIp = {
        ip: resp['ip'],
        isp: resp['isp'],
        city: resp['location'].city,
        lat: resp['location'].lat,
        lng: resp['location'].lng,
        region: resp['location'].region,
        timezone: resp['location'].timezone
      }
      return details;
    }),(catchError(err => [
      this.errorService.simpleErrorHandler(err)
    ])));
  }

}
