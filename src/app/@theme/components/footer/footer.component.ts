import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created by Kamil Wróbel and Marcin Zieliński, based on nginx-admin</span>
  `,
})
export class FooterComponent {
}
