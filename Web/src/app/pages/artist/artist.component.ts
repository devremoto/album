import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { ToasterService } from 'src/app/components/toaster.service';
import { PagingModel } from 'src/app/components/pagination/paging-model';
import { DialogService } from 'src/app/components/dialog/dialog.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
  providers: [NgbActiveModal]
})
export class ArtistComponent implements OnInit {

  artistList: Artist[];
  paging: PagingModel<Artist> = new PagingModel<Artist>();
  artist: Artist = {};
  loading = false;
  ref: NgbModalRef;
  closeResult = '';
  role: string;
  @ViewChild('content') content: any;

  constructor(
    private artistService: ArtistService,
    private modalService: NgbModal,
    private toasterService: ToasterService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadArtists();
  }

  async loadArtists() {
    this.paging = await this.artistService.getPage(this.paging).toPromise();
  }

  save() {
    this.loading = true;
    if (!this.validate()) {
      this.loading = false;
      return;
    }
    this.artistService.save(this.artist, this.artist.id != null)
      .subscribe(
        _ => {
          this.toasterService.pop('success', `${this.artist.name} saved successfully`);
          this.closePopup('');
          this.loadArtists();
          this.loading = false;
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', `Error saving ${this.artist.name}`);
          this.loading = false;
        }
      );
  }

  new() {
    this.artist = new Artist();
    this.openPopup(this.content);
  }

  edit(artist: Artist) {
    this.artist = artist;
    this.openPopup(this.content);
  }

  remove(artist: Artist) {
    this.dialogService.confirm('Do you really want remove?',
      (result) => {
        if (result) {
          this.artistService.removeById(artist.id)
            .subscribe(
              () => {
                const index = this.paging.list.findIndex(x => x.id === artist.id);
                this.paging.list.splice(index, 1);
                this.toasterService.success('Artist removida');
                this.loadArtists();
              },
              _ => {
                this.toasterService.error('Occoreu um erro ao tentar remover a Artist');
              });
        }
      });
  }

  validate(): boolean {

    let error = '';
    if (!this.artist.name) {
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
