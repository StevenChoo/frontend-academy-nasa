import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NasaLibService, NasaServiceObserver, NasaPicture, DateRange, Coordinates } from '../nasa-service/nasa-lib.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'nasa-photo-viewer',
  templateUrl: './nasa-photo-viewer.component.html',
  styleUrls: ['./nasa-photo-viewer.component.scss']
})
export class NasaPhotoViewer implements OnInit, OnDestroy, NasaServiceObserver {
  @Input() latitude: number|string;
  @Input() longitude: number|string;
  @Input() date: Date|string;

  @ViewChild('nasaForm') nasaForm: NgForm;

  nasaPicture: NasaPicture;
  subscription: Subscription[];
  dateRange: DateRange;zv
  maxDate: Date = new Date;

  constructor(private nasaService: NasaLibService, private dataPipe: DatePipe) { }

  ngOnInit() {
    this.nasaService.subscribe(this);

    this.latitude = 51.900300;
    this.longitude = 4.548440;

    this.nasaForm.valueChanges.subscribe(values => {
      if(this.nasaForm.valid){
        setTimeout(() => {
          this.loadPicture();
        }, 0)
      }
    })
  }

  ngOnDestroy() {
    this.nasaService.unsubscribe(this);
  }

  onPictureUpdate(picture: NasaPicture) {
    this.nasaPicture = picture;
  }

  private loadPicture(){
    this.nasaService.updateCoordinates(this.createCoordinates());
    this.nasaService.updateDatePicture(this.getDate(this.date));
    this.nasaService.refreshPicture();
  }

  private createCoordinates(): Coordinates{
    return {
      latitude: this.getFLoat(this.latitude),
      longitude: this.getFLoat(this.longitude)
    } as Coordinates;
  }

  // Date object or string formatted as YYYY-MM-DD
  private getDate(date: any): Date{
    if (date instanceof Date) {
      return date;
    }
    return new Date(date);
  }

  private getFLoat(number: number|string): number{
    if(typeof number === 'number'){
      return number;
    }
    return Number.parseFloat(number);
  }
}
