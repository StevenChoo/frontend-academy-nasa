import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { PictureShower } from './components/picture-shower/picture-shower.component';
import { TestComponent } from './components/test/test.component';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './views/home/home.component';

// Components

// Pages
// import {  } from '';

@NgModule({
  declarations: [
    AppComponent,
    PictureShower,
    TestComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [DataService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
