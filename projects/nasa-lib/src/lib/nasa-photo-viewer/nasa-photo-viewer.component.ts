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

    nasaPicture:any = null;
    loading:boolean = false;

    constructor(private nasaService: NasaLibService, private dataPipe: DatePipe) { }

    ngOnInit() {
        this.nasaService.subscribe(this);
    }

    ngOnDestroy() {
        this.nasaService.unsubscribe(this);
    }

    onPictureUpdate(picture: NasaPicture) {
       this.nasaPicture = picture;
    }

    onStatusUpdate(status: string, state: boolean) {
        if(status === 'loading'){
            this.loading = state;
        }
    }
}
