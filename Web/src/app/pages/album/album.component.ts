import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';
import { ToasterService } from 'src/app/components/toaster.service';
import { PagingModel } from 'src/app/components/pagination/paging-model';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumTypeService } from 'src/app/services/album-type.service';
import { AlbumType } from 'src/app/models/album-type';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  providers: [NgbActiveModal]
})
export class AlbumComponent implements OnInit {

  albumList: Album[];
  paging: PagingModel<Album> = new PagingModel<Album>();
  album: Album = {};
  loading = false;
  ref: NgbModalRef;
  closeResult = '';
  role: string;
  @ViewChild('content') content: any;
  artists: Artist[];
  albumTypes: AlbumType[];

  constructor(
    private albumService: AlbumService,
    private artitstService: ArtistService,
    private albumTypeService: AlbumTypeService,
    private modalService: NgbModal,
    private toasterService: ToasterService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadArtists();
    this.loadTypes();
    this.loadAlbums();
  }

  async loadAlbums(event?: any) {

    this.loading = true;

    this.parseFilter(event);
    await this.search();
  }

  async search() {
    this.paging = await this.albumService.getPage(this.paging).toPromise();
    this.loading = false;
  }

  private parseFilter(event: any) {

    if (event && event.filters) {
      this.paging.query = {};
      for (const key in event.filters) {
        if (typeof event.filters[key] === 'object') {
          const filter = event.filters[key];
          const value = filter[0].value;
          if (value) {
            this.paging.query[key] = value;
          } else {
            delete (this.paging.query[key]);
          }
        }
      }
      this.paging.orderBy = event.sortField;
      this.paging.orderDirection = event.sortOrder === 1 ? 'ASC' : 'DESC';
      this.paging.number = (event.first / this.paging.size) + 1;
    }
  }

  async loadArtists() {
    this.artists = await this.artitstService.getAll().toPromise();
  }

  async loadTypes() {
    this.albumTypes = await this.albumTypeService.getAll().toPromise();
  }

  save() {
    this.loading = true;
    if (!this.validate()) {
      this.loading = false;
      return;
    }
    this.albumService.save(this.album, this.album.id != null)
      .subscribe(
        _ => {
          this.toasterService.pop('success', `${this.album.title} saved successfully`);
          this.closePopup('');
          this.loadAlbums();
          this.loading = false;
        },
        _ => {
          this.toasterService.pop('error', `Error saving ${this.album.title}`);
          this.loading = false;
        }
      );
  }

  new() {
    this.album = new Album();
    this.openPopup(this.content);
  }

  edit(album: Album) {
    this.album = album;
    this.openPopup(this.content);
  }

  remove(album: Album) {
    this.dialogService.confirm('Do you really want remove?',
      (result) => {
        if (result) {
          this.albumService.removeById(album.id)
            .subscribe(
              () => {
                const index = this.paging.list.findIndex(x => x.id === album.id);
                this.paging.list.splice(index, 1);
                this.toasterService.success('Album removida');
                this.loadAlbums();
              },
              _ => {
                this.toasterService.error('Occoreu um erro ao tentar remover a Album');
              });
        }
      });
  }

  validate(): boolean {

    let error = '';
    if (!this.album.title) {
      error = 'The field title is required';
    }
    if (!this.album.artistId) {
      error = 'The field artist is required';
    }
    if (!this.album.albumTypeId) {
      error = 'The field album type is required';
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
