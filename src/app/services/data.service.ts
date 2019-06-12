import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable()
export class DataService {
  private BASEURL: string = "https://api.nasa.gov/planetary/apod";
  private PARAM_API_KEY: string = "api_key";
  private QUERY_PARAM_DATE: string = "date";
  private PARAM_HD: string = "hd";

  private apiKey: string = "NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";

  constructor(private http: HttpClient, private datePipe: DatePipe) {

  }

  getPictureOfTheDay(date: Date = new Date()) {
    return this.http.get(this.BASEURL, {params: this.getParams(date,true)}).toPromise();
  }

  private getParams(date: Date, hdPicture: boolean = false): HttpParams {
    return new HttpParams()
      .set(this.PARAM_API_KEY, this.apiKey)
      .set(this.QUERY_PARAM_DATE, this.datePipe.transform(date, "yyyy-MM-dd"))
      .set(this.PARAM_HD, hdPicture ? "True" : "False");
  }
}
