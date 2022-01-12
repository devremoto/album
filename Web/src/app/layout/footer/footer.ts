import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './footer.html'
})
export class FooterAdminComponent {
  environment = environment;
  year = new Date().getFullYear();
}
