import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { PlannedEvent } from '../models/planned-event.model';
import { EventService } from '../services/event.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dp-edit-event-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-event-page.component.html',
  styleUrl: './edit-event-page.component.scss'
})
export class EditEventPageComponent implements OnInit {

  public plannedEvent?: PlannedEvent;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
    this.route.data.subscribe( ({event } : Data) => {
      this.eventService.get(event.id).subscribe((event) =>{
        this.plannedEvent = event;
      });
    })
  }

  async update() {
    if(this.plannedEvent !== undefined)
      this.eventService.update(this.plannedEvent).subscribe(() => {

        this.router.navigate(['/events']);
    });
  }
}
