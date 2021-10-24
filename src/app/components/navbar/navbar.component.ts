import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PublicIp } from 'src/app/interfaces/public-ip';
import { DetailsIp } from 'src/app/interfaces/details-ip';

declare const require: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  svgSpinner = require('src/assets/img/spinner-solid.svg').default;
  svgArrow = require('src/assets/img/icon-arrow.svg').default;
  @Input() details: Observable<DetailsIp>;
  @Output() searchIp = new EventEmitter<PublicIp>();
  ipInfo: DetailsIp;
  eventSubscription: Subscription;
  spinner: boolean = true;
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
      this.spinner = false;
      this.ipInfo = details;
    })
  }

  search(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const ipaddress: PublicIp = form.controls.ip.value;
    this.searchIp.emit(ipaddress);
    this.spinner = true;
  }

}
