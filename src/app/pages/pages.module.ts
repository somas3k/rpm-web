import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {ProfileComponent} from './profile/profile.component';
import {ChartModule} from 'angular2-chartjs';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {EchartsMultipleXaxisComponent} from './echarts/echarts-multiple-xaxis.component';
import {EchartsRadarComponent} from './echarts/echarts-radar.component';
import {EchartsLineComponent} from './echarts/echarts-line.component';
import {EchartsComponent} from './echarts/echarts.component';
import {EchartsPieComponent} from './echarts/echarts-pie.component';
import {EchartsBarComponent} from './echarts/echarts-bar.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {MomentModule} from "ngx-moment";

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    MomentModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ProfileComponent,
    EchartsBarComponent,
    EchartsMultipleXaxisComponent,
    EchartsPieComponent,
    EchartsRadarComponent,
    EchartsComponent,
    EchartsLineComponent,
  ],
})
export class PagesModule {
}
