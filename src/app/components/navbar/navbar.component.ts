import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DetailsIp } from 'src/app/interfaces/details-ip';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  @Input() details: Observable<DetailsIp>;
  eventSubscription: Subscription;

  ngOnInit(): void {
    this.subscribeIpDetails();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  private subscribeIpDetails(): void {
    this.eventSubscription = this.details.subscribe((details: DetailsIp) => {
      console.log(details);
    })
  }

}
