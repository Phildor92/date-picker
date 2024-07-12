import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[dpSelectable]',
  standalone: true
})
export class SelectableDirective<T> {
  selected = false;
  @Output() public selectionChange = new EventEmitter<SelectionChange<T>>();
  @Input('dpSelectable') public subject!: T;

  constructor(private elementRef: ElementRef) {  }

  @HostListener('mousedown')
  mouseDown() {
    this.selected = !this.selected;
    this.selectionChange.emit({selected: this.selected, subject: this.subject })

    const selectableElement = this.elementRef.nativeElement as HTMLElement;
    if (this.selected) {

      selectableElement.classList.add('dp-selected');
      selectableElement.classList.remove('dp-unselected');
    }
    else {
      selectableElement.classList.add('dp-unselected');
      selectableElement.classList.remove('dp-selected');
    }
  }
}

export interface SelectionChange<T> {
	selected: boolean;
	subject: T;
}
