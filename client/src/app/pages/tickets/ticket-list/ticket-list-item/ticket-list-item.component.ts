import {Component, Input, OnInit} from '@angular/core';
import {ITour} from "../../../../models/ITour";

@Component({
  selector: 'app-ticket-list-item',
  template: `
    <div class="ticket-item"  >
      <h3 class="ticket-title" *ngIf="!ticket" >Loading...</h3>
      <img *ngIf="ticket" src="{{HostImgEndpoint}}{{ticket.img}}" />
      <div class="ticket-title">{{ticket?.name}}</div>
    </div>
  `,
  styleUrls: ['./ticket-list-item.scss']
})
export class TicketListItemComponent implements OnInit {
  @Input() ticket?: ITour;
  HostImgEndpoint = 'http://localhost:3000/tour-item/getImage/';
  constructor() { }

  ngOnInit(): void {
  }

}
