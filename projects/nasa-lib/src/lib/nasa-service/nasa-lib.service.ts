import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';

export interface Coordinates {
  latitude: number,
  longitude: number
}

@Injectable({
  providedIn: 'root'
})

export class NasaLibService {
  
  private BASEURL: string = "https://api.nasa.gov/planetary/apod";
  private PARAM_API_KEY: string = "api_key";
  private QUERY_PARAM_DATE: string = "date";
  private PARAM_HD: string = "hd";
  
  private apiKey: string = "NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";
  
  private coordinates: Coordinates;

  constructor(private http: HttpClient, private datePipe: DatePipe) {

  }

  public updateCoordinates(coordinates: Coordinates){
    this.coordinates = coordinates;
  }

  public getCoordinates(){
    return this.coordinates;
  }
  
  public getLatitude(){
    return this.coordinates.latitude;
  }

  public getLongitude(){
    return this.coordinates.longitude;
  }

  getPictureOfTheDay(date: Date = new Date()) {
    return this.http.get(this.BASEURL, {params: this.getParams(date,true)})
      .toPromise()
      .then(response => {
        debugger;
        return Promise.resolve(response);
      });
  }
  
  private getParams(date: Date, hdPicture: boolean = false): HttpParams {
    return new HttpParams()
      .set(this.PARAM_API_KEY, this.apiKey)
      .set(this.QUERY_PARAM_DATE, this.datePipe.transform(date, "yyyy-MM-dd"))
      .set(this.PARAM_HD, hdPicture ? "True" : "False");
  }
}
