import { ResolveFn } from '@angular/router';
import { PlannedEvent } from '../models/planned-event.model';
import { inject } from '@angular/core';
import { EventService } from '../services/event.service';

export const eventResolver: ResolveFn<PlannedEvent> = (route) => {
  return inject(EventService).get(route.paramMap.get('id') ?? '');
};
