import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import { forkJoin, map, Observable, Subject} from "rxjs";
import {ITour, ITourTypeSelect} from "../../models/ITour";
import {IOrder} from "../../models/IOrder";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable();
  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();
  ImageEndpoint ='http://localhost:3000/tour-item/getImage/';

  updateTicketList(data: ITour[]) {
    this.ticketUpdateSubject.next(data);
  }
  updateTour(type:ITourTypeSelect):void {
    this.ticketSubject.next(type);
  }
  constructor(private ticketRestService:TicketRestService) { }

  getTickets(): Observable<ITour[]> {
    return this.ticketRestService.getTickets().pipe(
      map((value, index)=> {
        const singleTours = value.filter((el)=>el.type === "single");

        return value.concat(singleTours);
      }),
      map((value, index)=> {
          return value.sort((a,b)=>(a.name.length+a.description.length)-(b.name.length+b.description.length));
        }),
    );
  }
  initTickets() {
    this.ticketRestService.initTickets().subscribe(()=>{
      this.getTickets().subscribe(data=>this.updateTicketList(data));
    });
  }
  deleteTickets() {
    this.ticketRestService.deleteTickets().subscribe(()=>{
      this.getTickets().subscribe(data=>this.updateTicketList(data));
    });

  }

  getTicketInfoById(id:string): Observable<[ITour,ITour[]]> {
    // const ticketPromise = this.ticketRestService.getTicketById(id).toPromise() as Promise<ITour>;
    // const nearestPromise = forkJoin([this.ticketRestService.getNearestTickets(), this.ticketRestService.getLocationList()])
    //   .pipe(map(data => {
    //     data[0].forEach(n => {
    //       n.location = data[1].find(l => n.locationId == l.id)
    //     });
    //     return [data[0], data[1]] as [INearestTour[], ITourLocation[]];
    //   })).toPromise() as Promise<[INearestTour[],ITourLocation[]]>;
    // const responses = await Promise.all([ticketPromise,nearestPromise]);
    //
    // const ticket = responses[0];
    // const [nearestTours,toursLocation] = responses[1];
    //
    // return [ticket,nearestTours,toursLocation];


    // const result = forkJoin([this.ticketRestService.getTicketById(id),this.ticketRestService.getNearestTickets(), this.ticketRestService.getLocationList()])
    //   .pipe(map(data => {
    //     data[1].forEach(n => {
    //       n.location = data[2].find(l => n.locationId == l.id)
    //     });
    //     return [data[0], data[1], data[2]] as [ITour,INearestTour[], ITourLocation[]];
    //   }))

    const result = forkJoin([this.ticketRestService.getTicketById(id),this.ticketRestService.getTickets()])


    return result;
  }

  getError():Observable<any> {
    return this.ticketRestService.getRestError();
  }


  sendTour(data: IOrder):Observable<any>{
    return this.ticketRestService.sendTourData(data);
  }

  createTour(tourData: FormData): Observable<ITour> {
    console.log(tourData)
    return this.ticketRestService.createTour(tourData);
  }


  getToursByName(searchText: string) {
    return this.ticketRestService.getToursByName(searchText);
  }
}
