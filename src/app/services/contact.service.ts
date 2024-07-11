import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  #contactSubject: BehaviorSubject<Contact[]>;
  constructor(private http: HttpClient){
    this.#contactSubject = new BehaviorSubject<Contact[]>([]);
    this.getAll();
  }

  getObservable(): Observable<Contact[]>{
    return this.#contactSubject.asObservable();
  }

  getAll(){
    this.http.get<Contact[]>(`${environment.backendUrl}/contacts`).subscribe(contacts => {
      this.#contactSubject.next(contacts);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create({id, ...contact}: Contact){
    this.http.post<Contact>(`${environment.backendUrl}/contacts`, contact).subscribe(() => {
      this.getAll();
    });

  }

  delete(id: string) {
    console.log(id);
    this.http.delete<Contact>(`${environment.backendUrl}/contacts/${id}`).subscribe(() => {
      this.getAll();
    });
  }

  update({id, ...contact}: Contact) {
    this.http.put<Contact>(`${environment.backendUrl}/contacts/${id}`, contact).subscribe(() => {
      this.getAll();
    });
  }
}
