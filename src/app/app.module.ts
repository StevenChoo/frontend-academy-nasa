import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { NasaLibModule } from 'nasa-lib';

// Components

// Pages
// import {  } from '';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    NasaLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
