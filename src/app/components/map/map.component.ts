import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './../../services/api.service';
import { PublicIp } from 'src/app/interfaces/public-ip';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  private KEY = environment.MaxpboxKey;
  private lat = environment.lat;
  private lng = environment.lng;
  private map: L;
  private publicIp: PublicIp;

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    this.getPublicIp();
    // this.createMap();
  }

  private createMap(): void {
    this.map = L.map('map').setView([this.lat, this.lng], 13); // Lat, long, zoom
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
    L.marker([this.lat, -79.53548]).addTo(this.map)
    .bindPopup(`Lat: ${this.lat}, Lng: ${this.lng}`)
    .openPopup();
  }

  private getPublicIp(): void {
    this.apiservice.getPublicIp().subscribe((publicIp: PublicIp) => {
      this.publicIp = publicIp;
      // this.getIpAddressInfo(this.publicIp);
    });
  }

  private getIpAddressInfo(publicIp: PublicIp): void {
    this.apiservice.getIpAddressInfo(publicIp).subscribe((ipAddressDetails: any) => {
      console.log(ipAddressDetails)
    })
  }

}
