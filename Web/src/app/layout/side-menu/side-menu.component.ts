import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  menu = [
    {
      name: 'Admin', icon: 'fa-cog', route: null, isNew: false, open: false, roles: ['master'],
      children: [
        { name: 'Albums', icon: 'fa-users', route: 'album', isNew: false, active: true },
        { name: 'Album Type', icon: 'fa-database', route: 'albumtype', isNew: false, active: true },
        { name: 'Artists', icon: 'fa-database', route: 'artist', isNew: false, active: true },
      ]
    },
  ];
  menuNoChildren = [];
  menuWithChildren = [];
  constructor() { }

  ngOnInit(): void {

    this.menuNoChildren = this.menu.filter(x => !x.children);
    this.menuWithChildren = this.menu.filter(x => x.children);
  }



  showChild(event, item: any) {
    if (item.children) {
      event.preventDefault();
      event.stopPropagation();
      if (event.target.tagName === 'A') {
        item.open = !item.open;
      } else {
        item.open = true;
      }
    } else {
      item.open = !item.open;
    }
  }

}
