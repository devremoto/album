import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
declare var window: any;
@Directive({
  selector: '[appEnter]'
})
export class EnterDirective {

  @Output()
  enterPressed: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  customEvent: boolean;

  constructor(private el: ElementRef) {
    this.init();
  }

  init() {
    // Get the input field
    const input = this.el.nativeElement;

    // Execute a function when the user releases a key on the keyboard
    window.addEventListener('keyup', (event) => {
      // Cancel the default action, if needed
      event.preventDefault();
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Trigger the button element with a click
        this.enterPressed.emit();
        if (!this.customEvent) {
          input.click();
        }
      }
    });
  }

}
