import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NasaLibService, NasaServiceObserver, NasaPicture, DateRange, Coordinates } from '../nasa-service/nasa-lib.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'nasa-photo-selector',
  templateUrl: './nasa-photo-selector.component.html',
  styleUrls: ['./nasa-photo-selector.component.scss']
})
export class NasaPhotoSelector implements OnInit, OnDestroy, NasaServiceObserver {

  constructor(private nasaService: NasaLibService, private dataPipe: DatePipe) { }

  ngOnInit() {
    this.nasaService.subscribe(this);
    this.nasaService.updateCoordinates({latitude:51.900300,longitude:4.548440});
    this.nasaService.updateDatePicture(new Date("2018-01-01"));
    this.nasaService.refreshPicture();
  }

  ngOnDestroy() {
    this.nasaService.unsubscribe(this);
  }

  onPictureUpdate(picture: NasaPicture) {
    // this.nasaPicture = picture;
  }

}
