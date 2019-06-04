import {Component, AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {DataRepository, HeartRateRecord} from '../../repository/data.repository';
import * as moment from 'moment';

@Component({
  selector: 'ngx-echarts-multiple-xaxis',
  template: `
    <div echarts [options]="options" [merge]=newData class="echart"></div>
  `,
})
export class EchartsMultipleXaxisComponent implements AfterViewInit, OnDestroy, OnInit {

  options: any = {};
  newData: any = {};
  themeSubscription: any;
  lastDateFrom: string;
  private dates: string[] = [];
  private heartRates: number[] = [];

  constructor(private theme: NbThemeService, private dataRepo: DataRepository) {
  }

  ngOnInit(): void {
    this.dataRepo
      .getHeartRateRecords('rx2sVx2+RyqDEWV2vxZ2V1R6SUQ=', '2010-06-04T10:00:00', '2019-06-04T11:00:00')
      .subscribe(value => this.updateChart(value));
    setInterval(_ => {
      let dateTo = moment().toISOString(true);
      dateTo = dateTo.substr(0, dateTo.indexOf('.'));
      this.dataRepo.getHeartRateRecords('rx2sVx2+RyqDEWV2vxZ2V1R6SUQ=', this.lastDateFrom, dateTo)
        .subscribe(value => this.updateChart(value));
    }, 1000);
  }

  private updateChart(value: HeartRateRecord[]) {
    if (value.length > 0) {
      let s = moment(value[value.length - 1].timestamp).add(1, 's').toISOString(true);
      s = s.substr(0, s.indexOf('.'));
      this.lastDateFrom = s.replace(' ', 'T');
    }
    this.heartRates.push(...value.map(v => v.heartRate));
    this.dates.push(...value.map(v => v.timestamp));
    this.heartRates = this.heartRates.slice(this.heartRates.length - 30, this.heartRates.length);
    this.dates = this.dates.slice(this.dates.length - 30, this.dates.length);
    this.newData = {
      xAxis: [
        {
          data: this.dates,
        },
      ],
      series: [
        {
          data: this.heartRates,
        },
      ],
    };
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.success, colors.info],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['Heart Rate'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.success,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Time: ' + params.value + (params.seriesData.length ? ' Pulse: ' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: this.dates,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Heart Rate',
            type: 'line',
            xAxisIndex: 0,
            smooth: true,
            data: this.heartRates,
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
