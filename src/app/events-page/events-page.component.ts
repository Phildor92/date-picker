import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { PlannedEvent } from '../models/planned-event.model';
import { ContactNamePipe } from "../pipes/contact-name.pipe";
import { RouterModule } from '@angular/router';
import { CreateEventComponent } from "../create-event/create-event.component";

@Component({
  selector: 'dp-events-page',
  standalone: true,
  imports: [ContactNamePipe, RouterModule, CreateEventComponent],
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

  addEvent(plannedEvent:PlannedEvent) {
    this.eventService.create(plannedEvent).subscribe(console.log);
  }
}
