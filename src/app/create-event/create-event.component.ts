import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PlannedEvent } from '../models/planned-event.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-create-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent implements OnInit {
  @Output() submitted = new EventEmitter<PlannedEvent>();

  public createEventForm!: FormGroup<EventForm>;

  constructor(private nonNullableFormBuilder: NonNullableFormBuilder){  }

  ngOnInit(): void {
    this.createEventForm = this.nonNullableFormBuilder.group<EventForm>({
        name: this.nonNullableFormBuilder.control('', {
          validators: [Validators.required, Validators.minLength(2)]}),
        start: this.nonNullableFormBuilder.control(new Date(), {
          validators: [Validators.required]}),
        end: this.nonNullableFormBuilder.control(new Date(), {
          validators: [Validators.required]}),
        id: this.nonNullableFormBuilder.control(''),
        invitees:this.nonNullableFormBuilder.control([])
      },  { validators: [this.startBeforeEnd] }

    )
  }

  submit(){
    if(!this.createEventForm.valid)
      return;

    console.log(this.createEventForm.value);
    this.submitted.emit(this.createEventForm.getRawValue());
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

export type EventForm = {
  [P in keyof PlannedEvent]: FormControl<PlannedEvent[P]>;
  };
