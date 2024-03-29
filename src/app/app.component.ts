import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { PublicIp } from 'src/app/interfaces/public-ip';
import { DetailsIp } from 'src/app/interfaces/details-ip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'IPv4 & IPv6 address tracker';
  eventIpDetails: Subject<DetailsIp> = new Subject<DetailsIp>();
  eventSearchIp: Subject<PublicIp> = new Subject<PublicIp>();

  // Receive public ip address details from 'map' child component.
  ipDetails(details: DetailsIp): void {
    // Emit own public ip address details to 'navbar' child component.
    this.eventIpDetails.next(details);
  }

  // Receive search param from navbar component
  search(ipaddress: PublicIp): void {
    // Emit search param  to 'map' child component.
    this.eventSearchIp.next(ipaddress);
  }
}
