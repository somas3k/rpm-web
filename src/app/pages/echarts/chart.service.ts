import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  realTime: boolean = true;
  showFromLast: boolean = true;
  showDateRange: boolean = false;

  dateInputFrom: string;
  dateInputTo: string;

  timeInputFrom: string;
  timeInputTo: string;

  hourInputFrom: number;
  minuteInputFrom: number;
  secondInputFrom: number;
  hourInputTo: number;
  minuteInputTo: number;
  secondInputTo: number;

  minutesToShow: number = 1;
  updateChart: () => void;

  constructor() { }
}
