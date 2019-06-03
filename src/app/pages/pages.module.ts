import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {ProfileComponent} from './profile/profile.component';
import {ChartjsComponent} from './chartjs/chartjs.component';
import {ChartjsLineComponent} from './chartjs/chartjs-line.component';
import {ChartModule} from 'angular2-chartjs';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ChartjsBarHorizontalComponent} from './chartjs/chartjs-bar-horizontal.component';
import {ChartjsBarComponent} from './chartjs/chartjs-bar.component';
import {ChartjsMultipleXaxisComponent} from './chartjs/chartjs-multiple-xaxis.component';
import {ChartjsPieComponent} from './chartjs/chartjs-pie.component';
import {ChartjsRadarComponent} from './chartjs/chartjs-radar.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    ChartModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ProfileComponent,
    ChartjsBarHorizontalComponent,
    ChartjsBarComponent,
    ChartjsMultipleXaxisComponent,
    ChartjsPieComponent,
    ChartjsRadarComponent,
    ChartjsComponent,
    ChartjsLineComponent,
  ],
})
export class PagesModule {
}
