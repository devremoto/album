import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlbumType } from 'src/app/models/album-type';
import { AlbumTypeService } from 'src/app/services/album-type.service';
import { ToasterService } from 'src/app/components/toaster.service';
import { PagingModel } from 'src/app/components/pagination/paging-model';
import { DialogService } from 'src/app/components/dialog/dialog.service';

@Component({
  selector: 'app-album-type',
  templateUrl: './album-type.component.html',
  styleUrls: ['./album-type.component.css'],
  providers: [NgbActiveModal]
})
export class AlbumTypeComponent implements OnInit {

  albumTypeList: AlbumType[];
  paging: PagingModel<AlbumType> = new PagingModel<AlbumType>();
  albumType: AlbumType = {};
  loading = false;
  ref: NgbModalRef;
  closeResult = '';
  role: string;
  @ViewChild('content') content: any;

  constructor(
    private albumTypeService: AlbumTypeService,
    private modalService: NgbModal,
    private toasterService: ToasterService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadAlbumTypes();
  }

  async loadAlbumTypes() {
    this.paging = await this.albumTypeService.getPage(this.paging).toPromise();
  }

  save() {
    this.loading = true;
    if (!this.validate()) {
      this.loading = false;
      return;
    }
    this.albumTypeService.save(this.albumType, this.albumType.id != null)
      .subscribe(
        _ => {
          this.toasterService.pop('success', `${this.albumType.name} saved successfully`);
          this.closePopup('');
          this.loadAlbumTypes();
          this.loading = false;
        },
        _ => {
          this.toasterService.pop('error', `Error saving ${this.albumType.name}`);
          this.loading = false;
        }
      );
  }

  new() {
    this.albumType = new AlbumType();
    this.openPopup(this.content);
  }

  edit(albumType: AlbumType) {
    this.albumType = albumType;
    this.openPopup(this.content);
  }

  remove(albumType: AlbumType) {
    this.dialogService.confirm('Do you really want remove?',
      (result) => {
        if (result) {
          this.albumTypeService.removeById(albumType.id)
            .subscribe(
              () => {
                const index = this.paging.list.findIndex(x => x.id === albumType.id);
                this.paging.list.splice(index, 1);
                this.toasterService.success('AlbumType removida');
                this.loadAlbumTypes();
              },
              _ => {
                this.toasterService.error('Occoreu um erro ao tentar remover a AlbumType');
              });
        }
      });
  }

  validate(): boolean {

    let error = '';
    if (!this.albumType.name) {
      error = 'The field name is required';
    }
    if (error) {
      this.toasterService.error(error);
      return false;
    }
    return true;
  }

  openPopup(content) {
    this.ref = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });

    this.ref.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.closePopup(reason)}`;
      });
  }

  private closePopup(reason?: any) {
    this.ref.dismiss(reason);
  }

}
