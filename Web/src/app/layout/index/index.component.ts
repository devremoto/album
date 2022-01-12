import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
  ) {
    this.changeTitle();
  }

  noSelected: any;
  title: any;
  environment: any;
  ngOnInit(): void {
    this.environment = environment;
    $('body')
      .removeAttr('class')
      .addClass('app footer-fixed header-fixed sidebar-fixed aside-menu-fixed pace-done aside-menu-hidden');
  }
  changeTitle() {
    this.router.events.subscribe((val: ActivationStart) => {
      if (val.snapshot && val.snapshot.data && val.snapshot.data.title) {
        this.title = val.snapshot.data.title;
        this.titleService.setTitle(`${environment.appName} - ${this.title}`);
      }
    });
  }

}
