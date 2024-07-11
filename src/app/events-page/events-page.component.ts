import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { PlannedEvent } from '../models/planned-event.model';
import { ContactNamePipe } from "../pipes/contact-name.pipe";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dp-events-page',
  standalone: true,
  imports: [ContactNamePipe, RouterModule],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss'
})
export class EventsPageComponent implements OnInit {

  events: PlannedEvent[] =[];

  constructor(private eventService: EventService){

  }

  ngOnInit(): void {
    this.eventService.getAll().subscribe((events) => {
      this.events = events;
    })
  }
}
