import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input() title: string;
  @Input() isConfirm: boolean;
  @Input() message: string;
  @Input() callback: any;
  @Input() windowClass: string;
  @Input() modalRef: NgbModalRef;
  @Output() confirmEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }

  close(result) {
    if (result) {
      this.activeModal.dismiss('Cross click');
      this.activeModal.close('Cross click');
      if (this.callback) {
        this.callback();
      } else {
        this.modalRef.dismiss();
        this.activeModal.dismiss('not confirmed');
      }
    } else {
      this.activeModal.dismiss('not confirmed');
    }
  }

  confirm(isOk: boolean) {
    this.confirmEvent.emit(isOk);
    this.close('confirm');
  }
}
