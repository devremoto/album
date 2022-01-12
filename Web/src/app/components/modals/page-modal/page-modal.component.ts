import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-modal',
  templateUrl: './page-modal.component.html',
  styleUrls: ['./page-modal.component.css'],
  providers: [NgbActiveModal]
})
export class PageModalComponent implements OnInit {

  ref: NgbModalRef;
  closeResult = '';
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openPopup(content) {
    this.ref = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });

    this.ref.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.closePopup(reason)}`;
    });
  }

  private closePopup(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason === 'Solicitação enviada') {
      this.ref.dismiss(reason);
    } else {
      return `with: ${reason}`;
    }
  }

}



