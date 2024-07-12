import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PlannedEvent } from '../models/planned-event.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-create-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
  @Output() submitted = new EventEmitter<Omit<PlannedEvent, 'id'>>();

  createEventForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]}),
    start: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required]}),
    end: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required]}),
  },
  { validators: [this.startBeforeEnd] });

  submit(){
    if(!this.createEventForm.valid)
      return;

    console.log(this.createEventForm.value);
    this.submitted.emit({...this.createEventForm.value as Required<PlannedEvent>, invitees: []});
  }

  startBeforeEnd(form: AbstractControl): ValidationErrors | null {
    const start = form.get('start')?.value;
    const end = form.get('end')?.value;
    if(!start || !end)
      return { startBeforeEnd: {start, end}};
    if(start == new Date() || end == new Date())
      return { startBeforeEnd: {start, end}};
    if(start.valueOf() > end.valueOf())
      return { startBeforeEnd: { start, end } };
    else
      return null;
  }
}
