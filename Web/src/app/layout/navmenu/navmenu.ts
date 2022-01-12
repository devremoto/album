import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-nav-menu',
  templateUrl: './navmenu.html',
  styleUrls: ['./navmenu.css']
})
export class NavMenuAdminComponent implements OnInit {
  isLoggedIn: boolean;
  user: any = {};
  constructor() {

  }

  menu = [
    { name: 'Home', icon: 'fi-menu-dots', route: 'home', isNew: false, active: true },
    { name: 'Processos', icon: 'fi-code', route: 'processos', isNew: false, active: true },
    { name: 'Usuários', icon: 'fi-users', route: 'usuarios', isNew: false, active: true, roles: ['master', 'gerente'] },
    {
      name: 'Cadastros', icon: 'fi-cog', route: null, isNew: false, open: false, roles: ['master'],
      children: [
        { name: 'Clientes', icon: 'fi-users', route: 'client', isNew: false, active: true },
      ]
    },
    { name: 'Sair', icon: 'fi-exit', route: 'logout', isNew: false, active: true },
  ];

  ngOnInit(): void {

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
