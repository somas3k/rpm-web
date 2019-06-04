import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NbAuthService} from '@nebular/auth';
import {environment} from '../../environments/environment';

export class Device {
  id: string;
  deviceName: string;
}

export class HeartRateRecord {
  timestamp: string;
  heartRate: number;
}

@Injectable({providedIn: 'root'})
export class DataRepository {
  private token: any;

  constructor(private httpClient: HttpClient,
              private auth: NbAuthService) {
    this.auth.onTokenChange().subscribe(value => {
      this.token = value.getValue();
    });
  }

  getDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(environment.serverAddress + '/device', {headers: this.getHttpHeaders()});
  }

  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getHeartRateRecords(deviceId: string, dateFrom: string, dateTo: string): Observable<HeartRateRecord[]> {
    return this.httpClient.get<HeartRateRecord[]>(environment.serverAddress + '/heartrate/' + deviceId + '?dateFrom=' + dateFrom + '&dateTo=' + dateTo);
  }
}
