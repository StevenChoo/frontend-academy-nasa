import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NasaLibService, NasaServiceObserver, NasaPicture, DateRange, Coordinates } from '../nasa-service/nasa-lib.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'nasa-photo-viewer',
  templateUrl: './nasa-photo-viewer.component.html',
  styleUrls: ['./nasa-photo-viewer.component.scss']
})
export class NasaPhotoViewer implements OnInit, OnDestroy, NasaServiceObserver {
  @Input() latitude: number|string;
  @Input() longitude: number|string;
  @Input() date: Date|string;

  nasaForm: FormGroup;

  nasaPicture: NasaPicture;
  formSubscription: Subscription;
  dateRange: DateRange;
  maxDate: Date = new Date;

  constructor(private nasaService: NasaLibService, private dataPipe: DatePipe) {
  }

  ngOnInit() {
    this.nasaForm = new FormGroup({
      'latitude': new FormControl(this.latitude || null),
      'longitude': new FormControl(this.longitude || null),
      'date': new FormControl(this.date || null)
    });

    this.nasaService.subscribe(this);
    
    if (this.nasaForm.valid) {
      this.loadPicture(this.nasaForm.value);
    }

    this.formSubscription = this.nasaForm.valueChanges.subscribe(values => {
        if (this.nasaForm.valid) {
          this.loadPicture(values);
        }
      }
    );
  }

  ngOnDestroy() {
    this.nasaService.unsubscribe(this);
    this.formSubscription.unsubscribe();
  }

  onPictureUpdate(picture: NasaPicture) {
    this.nasaPicture = picture;
  }

  private loadPicture(data: any){
    this.nasaService.updateCoordinates(this.createCoordinates(data.latitude, data.longitude));
    this.nasaService.updateDatePicture(this.getDate(data.date));
    this.nasaService.refreshPicture();
  }

  private createCoordinates(latitude: any, longitude: any): Coordinates{
    return {
      latitude: this.getFLoat(latitude),
      longitude: this.getFLoat(longitude)
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
