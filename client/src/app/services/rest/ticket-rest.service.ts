import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ITour} from "../../models/ITour";
import {HttpClient} from "@angular/common/http";
import {IOrder} from "../../models/IOrder";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) {
  }

  getTickets(): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tours') //https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/
  }
  initTickets():Observable<any>{
    return this.http.post('http://localhost:3000/tours',{})
  }
  deleteTickets():Observable<any> {
    return this.http.delete('http://localhost:3000/tours/remove')
  }

  getTicketById(id: string): Observable<ITour> {
    return this.http.get<ITour>(`http://localhost:3000/tours/${id}`)
  }
  getToursByName(name:string): Observable<ITour[]>{
    return this.http.get<ITour[]>(`http://localhost:3000/tours/ToursByName/${name}`);
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://error_mockapi.io/apiv/v1/tours/')
  }

  sendTourData(data: IOrder): Observable<any> {
    return this.http.post(`http://localhost:3000/orders/`,data); ///assets/mocks/arr.json
  }

  getOrdersData(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`http://localhost:3000/orders/`);
  }

  createTour(tourData: FormData): Observable<ITour> {
    return this.http.post<ITour>(`http://localhost:3000/tour-item/`, tourData);
  }
}
