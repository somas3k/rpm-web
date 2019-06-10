import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {ProfileComponent} from './profile/profile.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {EchartsMultipleXaxisComponent} from './echarts/echarts-multiple-xaxis.component';
import {EchartsRadarComponent} from './echarts/echarts-radar.component';
import {EchartsLineComponent} from './echarts/echarts-line.component';
import {EchartsComponent} from './echarts/echarts.component';
import {EchartsPieComponent} from './echarts/echarts-pie.component';
import {EchartsBarComponent} from './echarts/echarts-bar.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {MomentModule} from 'ngx-moment';
import {EchartsAreaStackComponent} from './echarts/echarts-area-stack.component';
import {EchartsBarAnimationComponent} from './echarts/echarts-bar-animation.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {NbDatepickerModule} from '@nebular/theme';

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
    NgxMaterialTimepickerModule,
    NbDatepickerModule,
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
    EchartsAreaStackComponent,
    EchartsBarAnimationComponent,
  ],
})
export class PagesModule {
}
