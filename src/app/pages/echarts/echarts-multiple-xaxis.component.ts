import {Component, AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {DataRepository, HeartRateRecord} from '../../repository/data.repository';
import * as moment from 'moment';
import {ChartService} from "./chart.service";

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
  minutesToShow: number = this.cs.minutesToShow;
  chartFilled: boolean = true;

  private dates: string[] = [];
  private heartRates: number[] = [];

  constructor(private theme: NbThemeService, private dataRepo: DataRepository, private cs: ChartService) {
    this.cs.updateChart = () => this.updateChart();
  }

  ngOnInit(): void {
    this.lastDateFrom = moment().subtract(this.cs.minutesToShow, 'm').toISOString(true);
    this.lastDateFrom = this.lastDateFrom.substr(0, this.lastDateFrom.indexOf('.'));
    // this.dataRepo
    //   .getHeartRateRecords('rx2sVx2+RyqDEWV2vxZ2V1R6SUQ=', '2010-06-04T10:00:00', '2019-06-04T11:00:00')
    //   .subscribe(value => this.updateChart(value));
    setInterval(_ => {
      if (this.cs.realTime && this.chartFilled) {
        console.log(this.cs.realTime);
        let dateTo = moment().toISOString(true);
        dateTo = dateTo.substr(0, dateTo.indexOf('.'));
        console.log(`lastDateFrom: ${this.lastDateFrom}`);
        console.log(`dateTo: ${dateTo}`);

        if (this.minutesToShow !== this.cs.minutesToShow) {
          this.minutesToShow = this.cs.minutesToShow;
          this.lastDateFrom = moment().subtract(this.minutesToShow, 'm').toISOString(true);
          this.lastDateFrom = this.lastDateFrom.substr(0, this.lastDateFrom.indexOf('.'));
          this.dates = [];
          this.heartRates = [];
          // this.dataRepo.getHeartRateRecords('rx2sVx2+RyqDEWV2vxZ2V1R6SUQ=', this.lastDateFrom, dateTo)
          //   .subscribe(value => this.newChart(value));
          // } else {
        }
        this.chartFilled = false;
        this.dataRepo.getHeartRateRecords('rx2sVx2+RyqDEWV2vxZ2V1R6SUQ=', this.lastDateFrom, dateTo)
          .subscribe(value => this.fillChart(value));
      }
    }, 1000);
  }

  public updateChart(): void {
    console.log(`dateInputFrom: ${this.cs.dateInputFrom}`);
    console.log(`timeFrom: ${this.cs.timeInputFrom}`);
    console.log(`dateInputTo: ${this.cs.dateInputTo}`);
    console.log(`timeTo: ${this.cs.timeInputTo}`);

    const dateInputFrom = this.cs.dateInputFrom; // we require non null
    const dateInputTo = this.cs.dateInputTo ? this.cs.dateInputTo : moment();
    const timeInputFrom = this.cs.timeInputFrom ? this.cs.timeInputFrom : '00:00';
    const timeInputTo = this.cs.timeInputTo ? this.cs.timeInputTo : '00:00';

    const hoursFrom = timeInputFrom.toString().split(':')[0];
    const minutesFrom = timeInputFrom.toString().split(':')[1];

    const hoursTo = timeInputTo.toString().split(':')[0];
    const minutesTo = timeInputTo.toString().split(':')[1];

    const dateFrom = moment(dateInputFrom)
      .add(hoursFrom, 'h')
      .add(minutesFrom, 'm');
    const dateTo = moment(dateInputTo)
      .add(hoursTo, 'h')
      .add(minutesTo, 'm');

    // this.cs.minutesToShow = moment.duration(dateTo.diff(dateFrom)).asMinutes();

    let dateFromStr = dateFrom.toISOString(true);
    let dateToStr = dateTo.toISOString(true);

    dateFromStr = dateFromStr.substr(0, dateFromStr.indexOf('.'));
    dateToStr = dateToStr.substr(0, dateToStr.indexOf('.'));

    console.log(`dateParsedFrom: ${dateFromStr}`);
    console.log(`dateParsedTo: ${dateToStr}`);


    this.dataRepo.getHeartRateRecords('rx2sVx2+RyqDEWV2vxZ2V1R6SUQ=', dateFromStr, dateToStr)
      .subscribe(value => {
        this.dates = [];
        this.heartRates = [];
        this.fillChart(value);
      });
  }

  private fillChart(value: HeartRateRecord[]) {
    if (value.length > 0) {
      let s = moment(value[value.length - 1].timestamp).add(1, 's').toISOString(true);
      s = s.substr(0, s.indexOf('.'));
      this.lastDateFrom = s.replace(' ', 'T');
    }
    this.heartRates.push(...value.map(v => v.heartRate));
    this.dates.push(...value.map(v => v.timestamp));

    const startHeartRateIndex = this.cs.realTime ? this.heartRates.length - this.cs.minutesToShow * 60 : 0;
    this.heartRates = this.heartRates.slice(startHeartRateIndex > 0 ? startHeartRateIndex : 0, this.heartRates.length);

    const startDatesIndex = this.cs.realTime ? this.dates.length - this.cs.minutesToShow * 60 : 0;
    this.dates = this.dates.slice(startDatesIndex > 0 ? startDatesIndex : 0, this.dates.length);

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
    this.chartFilled = true;
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
