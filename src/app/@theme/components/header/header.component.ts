import {Component, Inject, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {UserData} from '../../../@core/data/users';
import {AnalyticsService} from '../../../@core/utils';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{title: 'Profile', link: '/pages/profile'}, {title: 'Log out'}];

  authMenu = [
    {
      title: 'Login',
      link: '/auth/login',
    },
    {
      title: 'Register',
      link: '/auth/register',
    },
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private authService: NbAuthService,
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable
        }
      });
  }

  ngOnInit() {
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'user-ctx-mn'),
        map(({item: {title}}) => title),
      )
      .subscribe(title => {
        if (title === 'Log out') {
          this.onLogout();
        }
      });
  }

  toggleSidebar()
    :
    boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  onLogout() {
    this.authService.logout('email').subscribe(() => null);
  }
}
