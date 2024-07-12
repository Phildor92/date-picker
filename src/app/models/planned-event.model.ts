import { Contact } from "./contact.model";

export interface PlannedEvent{
  id: string;
  name: string;
  invitees: Contact[];
  start: Date;
  end: Date;
}
