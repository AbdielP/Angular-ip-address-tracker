import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './../../services/api.service';
import { DetailsIp } from 'src/app/interfaces/details-ip';
import { PublicIp } from 'src/app/interfaces/public-ip';
import { Observable, Subscription } from 'rxjs';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  private KEY = environment.MaxpboxKey;
  private map: L;
  private publicIp: PublicIp;
  private ipDetails: DetailsIp

  @Output() details = new EventEmitter<DetailsIp>();
  @Input() searchIp: Observable<PublicIp>;
  eventSubscription: Subscription;

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    this.getPublicIp();
    this.subscribeSearch();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  private createMap(): void {
    this.map = L.map('map').setView([this.ipDetails.lat, this.ipDetails.lng], 18); // Lat, lng, zoom
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.KEY}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 22,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: `${this.KEY}`
    }).addTo(this.map);

    // !IMPORTANT:  This is the Leaflet map API. Although this one is free and no need a KEY, I've preferred to use Mapbox.
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(this.map)

    this.addMarker();
  }

  private addMarker() {
    const customIcon = L.icon({
      iconUrl: '../../../assets/img/icon-location.svg',
      iconAnchor:   [22, 60],
      popupAnchor:  [1, -60]
    });
    L.marker([this.ipDetails.lat, this.ipDetails.lng], { icon: customIcon }).addTo(this.map)
    .bindPopup(`Lat: ${this.ipDetails.lat}, Lng: ${this.ipDetails.lng}`)
    .openPopup();
  }

  // Find your own public IP
  private getPublicIp(): void {
    this.apiservice.getPublicIp().subscribe((publicIp: PublicIp) => {
      this.publicIp = publicIp;
      this.getIpAddressInfo(this.publicIp);
    });
  }

  private getIpAddressInfo(publicIp: PublicIp): void {
    this.apiservice.getIpAddressInfo(publicIp).subscribe((ipDetails: DetailsIp) => {
      this.ipDetails = ipDetails;
      this.details.emit(this.ipDetails);
      this.createMap();
    });
  }

  // Search public IP Address
  private subscribeSearch(): void {
    this.eventSubscription = this.searchIp.subscribe((ipaddress: PublicIp) => {
      this.apiservice.getIpAddressInfo(ipaddress).subscribe((ipDetails: DetailsIp) => {
        this.ipDetails = ipDetails;
        this.details.emit(this.ipDetails);
        this.map.remove();
        this.createMap();
      });
    });
  }
}
