import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {NasaMapsComponent} from './nasa-maps/nasa-maps.component';
import {NasaLibService} from './nasa-service/nasa-lib.service';
import {NasaPhotoViewer} from './nasa-photo-viewer/nasa-photo-viewer.component';
import {NasaPhotoSelector} from './nasa-photo-selector/nasa-photo-selector.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        NasaMapsComponent,
        NasaPhotoViewer,
        NasaPhotoSelector
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        NasaMapsComponent,
        NasaPhotoViewer,
        NasaPhotoSelector
    ],
    providers: [
        NasaLibService,
        HttpClientModule,
        DatePipe
    ]
})
export class NasaLibModule {
}
