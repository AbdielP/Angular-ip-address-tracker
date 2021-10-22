import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { DetailsIp } from 'src/app/interfaces/details-ip';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  @Input() details: Observable<DetailsIp>;
  @Output() searchIp = new EventEmitter<string>();
  ipInfo: DetailsIp;
  eventSubscription: Subscription;

  form = {
    ip: ''
  }

  ngOnInit(): void {
    this.subscribeIpDetails();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  private subscribeIpDetails(): void {
    this.eventSubscription = this.details.subscribe((details: DetailsIp) => {
      // console.log(details);
      this.ipInfo = details;
    })
  }

  search(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const ipaddress: string = form.controls.ip.value;
    this.searchIp.emit(ipaddress);
  }

}
