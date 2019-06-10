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
    actions: {
      edit: false,
    },
    add: {
      confirmCreate: true,
    },
    delete: {
      confirmDelete: true,
    },
    mode: 'inline',
  };

  constructor(private dataRepository: DataRepository) {
  }

  ngOnInit() {
    this.dataRepository.getDevices().subscribe(value => this.devices = value);
  }

  onNew(event: any) {
    this.dataRepository
      .saveDevice(event.newData.id, event.newData.deviceName)
      .subscribe(value => event.confirm.resolve(value), () => event.confirm.reject());
  }

  onDelete(event: any) {
    this.dataRepository
      .deleteDevice(event.data.id)
      .subscribe(() => event.confirm.resolve(), () => event.confirm.reject());
  }
}
