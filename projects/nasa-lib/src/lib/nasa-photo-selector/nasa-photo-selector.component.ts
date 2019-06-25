import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NasaLibService, NasaServiceObserver, NasaPicture, DateRange, Coordinates } from '../nasa-service/nasa-lib.service';
import { DatePipe } from '@angular/common';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'nasa-photo-selector',
  templateUrl: './nasa-photo-selector.component.html',
  styleUrls: ['./nasa-photo-selector.component.scss']
})
export class NasaPhotoSelector implements OnInit, OnDestroy, NasaServiceObserver {

    @Input() latitude: number|string;
    @Input() longitude: number|string;
    @Input() date: Date|string;

    nasaForm: FormGroup;

    nasaPicture: NasaPicture;
    formSubscription: Subscription;
    dateRange: DateRange;
    maxDate: Date = new Date;

    loading:boolean = false;

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
                    if(this.loading === true){
                        alert("Already loading a picture...");
                    }else{
                        this.loadPicture(values);
                    }
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

    onStatusUpdate(status: string, state: boolean) {
        if(status === 'loading'){
            this.loading = state;
        }
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
