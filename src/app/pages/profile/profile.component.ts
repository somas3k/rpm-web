import {Component, OnInit} from '@angular/core';
import {DataRepository, Device} from '../../repository/data.repository';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  devices: Device[];

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      deviceName: {
        title: 'Device name',
      },
    },
  };

  constructor(private dataRepository: DataRepository) {
  }

  ngOnInit() {
    this.dataRepository.getDevices().subscribe(value => this.devices = value);
  }

}
