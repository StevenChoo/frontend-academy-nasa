import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NasaCoordinateCustomizerComponent } from './nasa-coordinate-customizer/nasa-coordinate-customizer.component';
import { NasaMapsComponent } from './nasa-maps/nasa-maps.component';
import { NasaPhotoViewer } from './nasa-photo-viewer/nasa-photo-viewer.component';
import { NasaLibService } from './nasa-service/nasa-lib.service';

@NgModule({
  declarations: [
    NasaCoordinateCustomizerComponent,
    NasaMapsComponent,
    NasaPhotoViewer
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NasaCoordinateCustomizerComponent,
    NasaMapsComponent,
    NasaPhotoViewer
  ],
  providers: [
    NasaLibService
  ]
})
export class NasaLibModule { }
