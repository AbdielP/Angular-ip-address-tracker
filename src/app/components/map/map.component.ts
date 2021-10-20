import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './../../services/api.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  private KEY = environment.MaxpboxKey;
  map: L;

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    this.getIpAddressInfo();
    this.createMap();
  }

  private createMap(): void {
    this.map = L.map('map').setView([8.95255, -79.53548], 13); // Lat, long, zoom
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.KEY}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: `${this.KEY}`
    }).addTo(this.map);

   this.addMarker();
  }

  private addMarker() {
    L.marker([8.95255, -79.53548]).addTo(this.map)
    .bindPopup('Lat: 8.95255, Lng: -79.53548')
    .openPopup();
  }

  private getIpAddressInfo(): void {
    this.apiservice.getIpAddressInfo().subscribe()
  }

}
