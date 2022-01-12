import { NgModule } from '@angular/core';
import { AlbumTypeComponent } from './album-type/album-type.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'albumtype', component: AlbumTypeComponent, data: { title: 'Album Type' } },
  { path: 'album', component: AlbumComponent, data: { title: 'Album' } },
  { path: 'artist', component: ArtistComponent, data: { title: 'Artist' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
