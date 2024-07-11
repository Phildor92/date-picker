import { Routes } from '@angular/router';
import { ContactsPageComponent } from './contactspage/contacts-page.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { eventResolver } from './resolvers/event-resolver';
import { EditEventPageComponent } from './edit-event-page/edit-event-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactsPageComponent },
  { path: 'events', component: EventsPageComponent },
  { path: 'events/edit/:id', component: EditEventPageComponent, resolve: {event: eventResolver} }
  ];
