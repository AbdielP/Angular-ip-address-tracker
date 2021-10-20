import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DetailsIp } from 'src/app/interfaces/details-ip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-ip-address-tracker';
  eventIpDetails: Subject<DetailsIp> = new Subject<DetailsIp>();

  // Receive public ip address details from 'map' child component.
  ipDetails(details: DetailsIp): void {
    // Emit public ip address details to 'navbar' child component.
    this.eventIpDetails.next(details);
  }
}
