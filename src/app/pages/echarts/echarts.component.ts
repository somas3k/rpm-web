import {Component, OnInit} from '@angular/core';
import {ChartService} from './chart.service';
import {
  NgxMaterialTimepickerContainerTheme, NgxMaterialTimepickerDialTheme,
  NgxMaterialTimepickerFaceTheme,
  NgxMaterialTimepickerTheme,
} from 'ngx-material-timepicker';
import * as moment from 'moment';
import {DataRepository} from '../../repository/data.repository';

@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})

export class EchartsComponent implements OnInit {
  devices: string[] = [];
  currentTheme: string;

  timepicker: NgxMaterialTimepickerTheme = new class implements NgxMaterialTimepickerTheme {
    clockFace: NgxMaterialTimepickerFaceTheme = new class implements NgxMaterialTimepickerFaceTheme {
      clockFaceBackgroundColor: string = '#4e41a5';
      clockFaceInnerTimeInactiveColor: string;
      clockFaceTimeActiveColor: string;
      clockFaceTimeDisabledColor: string;
      clockFaceTimeInactiveColor: string = '#7958fa';
      clockHandColor: string = '#7756F7';
    };
    container: NgxMaterialTimepickerContainerTheme = new class implements NgxMaterialTimepickerContainerTheme {
      bodyBackgroundColor: string = '#40397B';
      buttonColor: string = '#7756F7';
      primaryFontFamily: string = 'Roboto';
    };
    dial: NgxMaterialTimepickerDialTheme = new class implements NgxMaterialTimepickerDialTheme {
      dialActiveColor: string;
      dialBackgroundColor: string = '#4e41a5';
      dialInactiveColor: string;
    };
  };

  isDateFromEmpty: boolean = false;


  constructor(public cs: ChartService, private dataRepo: DataRepository) {
  }

  maxDate() {
    return moment().toISOString(true);
  }

  ngOnInit(): void {
    this.dataRepo.getDevices().subscribe(value => {
      this.devices = value.map(value1 => value1.id);
      this.cs.deviceId = this.devices[0];
    });
  }

  onClick(d: string) {
    this.cs.deviceId = d;
    this.cs.refresh();
  }
}
