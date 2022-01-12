import { EventEmitter, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {
  callback: any;
  modalRef: NgbModalRef;
  isConfirm = false;
  constructor(private modalService: NgbModal) { }
  confirm(message: string, callback?: any, windowClass?: any, title?: string) {
    this.isConfirm = true;
    this.openModal(message, callback, windowClass || 'primary', title || 'confirm');
  }

  danger(message: string, title?: string, callback?: any) {
    this.openModal(message, callback, 'danger', title);
  }

  error(message: string, title?: string, callback?: any) {
    this.openModal(message, callback, 'danger', title);
  }

  warning(message: string, title?: string, callback?: any) {
    this.openModal(message, callback, 'warning', title);
  }

  alert(message: string, title?: string, callback?: any) {
    this.openModal(message, callback, 'warning', title);
  }

  success(message: string, title?: string, callback?: any) {
    this.openModal(message, callback, 'success', title);
  }

  private openModal(message: string, callback?: any, windowClass?: any, title?: string, confirm?: boolean) {
    if (!windowClass) {
      windowClass = 'primary';
    }
    this.callback = callback;
    this.modalRef = this.modalService.open(DialogComponent, { backdrop: 'static', windowClass: `modal-${windowClass}` });
    this.modalRef.componentInstance.title = title || 'título';
    this.modalRef.componentInstance.message = message;
    this.modalRef.componentInstance.isConfirm = confirm || this.isConfirm || false;
    this.modalRef.componentInstance.modalRef = this.modalRef;
    if (callback) {
      this.modalRef.componentInstance.callback = callback;
    }
    const confirmEvent = this.modalRef.componentInstance.confirmEvent as EventEmitter<boolean>;
    confirmEvent.subscribe(x => {
      this.callback(x);
    });
    this.modalRef.componentInstance.windowClass = windowClass;
    this.modalRef.result.then(
      (result) => {
        if (result === 'Cross click') {
          this.modalRef.dismiss();
        }
      },
      (error) => {
        this.modalRef.dismiss();
      });

  }
}
