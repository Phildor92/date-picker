import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PlannedEvent } from '../models/planned-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<PlannedEvent[]> {
    return this.http.get<PlannedEvent[]>(`${environment.backendUrl}/events`);
  }

  get(id: PlannedEvent['id']): Observable<PlannedEvent> {
    return this.http.get<PlannedEvent>(`${environment.backendUrl}/events/${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create({ id, ...eventData }: PlannedEvent): Observable<PlannedEvent> {
    return this.http.post<PlannedEvent>(`${environment.backendUrl}/events`,
      eventData);
  }
  
  update({ id, ...eventData }: PlannedEvent): Observable<PlannedEvent> {
    return this.http.put<PlannedEvent>(`${environment.backendUrl}/events/${id}`,
      eventData);
  }
}
