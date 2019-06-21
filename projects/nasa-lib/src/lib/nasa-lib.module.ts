import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NasaMapsComponent } from './nasa-maps/nasa-maps.component';
import { NasaPhotoViewer } from './nasa-photo-viewer/nasa-photo-viewer.component';
import { NasaLibService } from './nasa-service/nasa-lib.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    NasaMapsComponent,
    NasaPhotoViewer
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    NasaMapsComponent,
    NasaPhotoViewer
  ],
  providers: [
    NasaLibService,
    HttpClientModule,
    DatePipe
  ]
})
export class NasaLibModule { }
