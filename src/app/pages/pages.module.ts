import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {ProfileComponent} from './profile/profile.component';
import {ChartjsComponent} from './chartjs/chartjs.component';
import {ChartjsLineComponent} from './chartjs/chartjs-line.component';
import {ChartComponent} from 'angular2-chartjs';
import {Ng2SmartTableModule} from 'ng2-smart-table';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ProfileComponent,
    ChartjsComponent,
    ChartComponent,
    ChartjsLineComponent,
  ],
})
export class PagesModule {
}
