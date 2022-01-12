import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderAdminComponent implements OnInit {
  userData: any;
  logoUrl = environment.logoUrl;
  imageStyle = `url(${environment.logoUrl})`;
  style = { 'background-image': `url(${environment.logoUrl}) !important;` };
  environment: any;
  date: Date = new Date();
  picture: string;

  constructor(
    private titleService: Title) { }

  ngOnInit(): void {
    this.style = { 'background-image': `url(${environment.logoUrl}) !important;` };

    this.environment = environment;
  }

  limitCharacters(value: string, size: number) {

    if (value && value.trim().length > size) {
      if (value.indexOf('@') > 0) {
        value = value.split('@')[0];
      }
      return `${value.substr(0, size)}...`;
    }
    return value;
  }
}
