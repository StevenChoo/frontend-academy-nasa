import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DatePipe} from '@angular/common';

const DAY_IN_MILLISECONDS = 86400000;

export interface Coordinates {
    latitude: number,
    longitude: number
}

export interface DateRange {
    begin: Date,
    end: Date,
}

@Injectable({
    providedIn: 'root'
})

export class NasaLibService {

    private DEFAULT_API_DATE_FORMAT = "yyyy-MM-dd";

    private BASEURL_ASSETS: string = "https://api.nasa.gov/planetary/earth/assets";
    private BASEURL_IMAGE: string = "https://api.nasa.gov/planetary/earth/imagery";

    private QUERY_PARAM_API_KEY: string = "api_key"; // api.nasa.gov key for expanded usage
    private QUERY_PARAM_LATITUDE: string = "lat";
    private QUERY_PARAM_LONGITUDE: string = "lon";
    private QUERY_PARAM_DATE_BEGIN: string = "begin"; // YYYY-MM-DD
    private QUERY_PARAM_DATE_END: string = "end"; // YYYY-MM-DD

    private QUERY_PARAM_DATE: string = "date"; // nodig voor picture of the day

    private apiKey: string = "NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";

    private coordinates: Coordinates;
    private datePicture: Date;

    private maxTries: number = 5;
    private incrementBy: number = 10;
    private attempt: number = 0;

    private observers: Set<NasaServiceObserver> = new Set();

    private dateFoundPicture: Date;
    private foundPicture: NasaPicture;

    private states: object = {};

    constructor(private http: HttpClient, private datePipe: DatePipe) {

    }

    public updateDatePicture(date: Date) {
        this.datePicture = date;
    }

    public updateCoordinates(coordinates: Coordinates) {
        this.coordinates = coordinates;
    }

    public refreshPicture(): void {
        this.getEarthPicture();
    }

    public getCoordinates(): Coordinates {
        return this.coordinates;
    }

    public getFoundPicture(): NasaPicture {
        return this.foundPicture;
    }

    public subscribe(observer: NasaServiceObserver) {
        if (!observer) {
            throw new Error("Invalid observer. Unable to subscribe. Observer must be instance of NasaServiceObserver");
        }
        this.observers.add(observer);
    }

    public unsubscribe(observer: NasaServiceObserver) {
        if (!observer) {
            throw new Error("Invalid observer. Unable to unsubscribe. Observer must be instance of NasaServiceObserver");
        }
        this.observers.delete(observer);
    }

    // https://api.nasa.gov/api.html#earth
    // https://api.nasa.gov/api.html#assets
    public getEarthPicture(): void {
        if(this.states['loading'] === true){
            console.log("Already fetching.");
            return;
        }
        this.updateStatus("loading",true);
        if (!this.isDateValid()) {
            return this.updatePicture(this.createInputErrorNasaPicture("Invalid dateRange given. Make sure to have a valid begin and end date of which the begin is before the end date."));
        } else if (!this.isCoordinatesValid()) {
            return this.updatePicture(this.createInputErrorNasaPicture("Invalid coordinates given. Make sure to have a valid latitude and longitude that are numbers."));
        } else {
            this.resetAttempts();
            return this.findEarthPicture(this.datePicture);
        }
    }

    private findEarthPicture(date: Date){
        this.attempt++;
        this.findEarthPictureClosestToDate(this.attempt,date)
            .then(picture => {
                if(null == picture || picture.count === 0){
                    return this.findEarthPicture(date);
                }else {
                    const datePicture = this.findAssetClosestDate(picture.results,this.datePicture);
                    this.dateFoundPicture = new Date(datePicture);
                    return this.getEarthPictureOfDate(this.dateFoundPicture, this.coordinates);
                }
            })
            .catch(error => {
                return this.updatePicture(this.createNotFoundNasaPicture(date));
            });
    }

    private findEarthPictureClosestToDate(attemp:number,date: Date): Promise<any> {
        console.log('fetching. attempt: ' + attemp);
        if(attemp > this.maxTries){
            return Promise.reject("Unable to find a picture closes to date.")
        }
        return this.http.get(this.BASEURL_ASSETS, {params: this.getParamsFindPicture(attemp,date,this.coordinates)}).toPromise();
    }

    private getParamsFindPicture(attempt: number, date: Date, coordinates: Coordinates): HttpParams {
        const daysDiff = this.getTotalDaysDifference(attempt, this.incrementBy);
        const dateStart = new Date().setTime(date.getTime() - (daysDiff * DAY_IN_MILLISECONDS));
        const dateEnd = new Date().setTime(date.getTime() + (daysDiff * DAY_IN_MILLISECONDS));

        return new HttpParams()
            .set(this.QUERY_PARAM_API_KEY, this.apiKey)
            .set(this.QUERY_PARAM_LATITUDE, coordinates.latitude.toString())
            .set(this.QUERY_PARAM_LONGITUDE, coordinates.longitude.toString())
            .set(this.QUERY_PARAM_DATE_BEGIN, this.datePipe.transform(dateStart, this.DEFAULT_API_DATE_FORMAT))
            .set(this.QUERY_PARAM_DATE_END, this.datePipe.transform(dateEnd, this.DEFAULT_API_DATE_FORMAT))
    }

    private getEarthPictureOfDate(date: Date, coordinates: Coordinates) {
        this.http.get(this.BASEURL_IMAGE, {params: this.getParamsGetPicture(coordinates.latitude, coordinates.longitude, date)})
            .toPromise()
            .then(response => {
                this.updatePicture(this.createNasaPicture(response));
            }).catch(error => {
               this.updatePicture(this.createErrorNasaPicture(error));
            });
    }

    private getParamsGetPicture(latitude: number, longitude: number, date: Date) {
        return new HttpParams()
            .set(this.QUERY_PARAM_API_KEY, this.apiKey)
            .set(this.QUERY_PARAM_LATITUDE, this.getCoordinates().latitude.toString())
            .set(this.QUERY_PARAM_LONGITUDE, this.getCoordinates().longitude.toString())
            .set(this.QUERY_PARAM_DATE, this.datePipe.transform(date, this.DEFAULT_API_DATE_FORMAT));
    }

    private isDateValid(): boolean {
        return this.datePicture instanceof Date && this.datePicture.toString() !== 'Invalid Date';
    }

    private updatePicture(nasaPicture: NasaPicture) {
        this.updateStatus("loading",false);
        this.foundPicture = nasaPicture;
        this.observers.forEach(o => o.onPictureUpdate(this.foundPicture));
    }

    private updateStatus(status: string, state: boolean){
        this.states['status'] = state;
        this.observers.forEach(o => o.onStatusUpdate(status, state));
    }

    private isCoordinatesValid() {
        if (!this.coordinates
            || typeof this.coordinates.latitude !== 'number'
            || typeof this.coordinates.longitude !== 'number') {
            return false;
        }
        return true;
    }

    private createNotFoundNasaPicture(date: Date) {
        const maxDaysDifference = this.getTotalDaysDifference(this.maxTries, this.incrementBy);
        const picture = new NasaPicture();
        picture.code = "404";
        picture.info = "Unable to find any picture " + maxDaysDifference + " days before or after given date: " + date;
        return picture;
    }

    private createNasaPicture(response: any) {
        const picture = new NasaPicture();
        picture.code = "200";
        picture.info = "success";
        picture.picture = response;
        return picture;
    }

    private createInputErrorNasaPicture(reason: string): NasaPicture {
        const picture = new NasaPicture();
        picture.code = "400";
        picture.info = reason;
        return picture;
    }

    private createErrorNasaPicture(reason: string) : NasaPicture{
        const picture = new NasaPicture();
        picture.code = "500";
        picture.info = reason;
        return picture;
    }

    private getTotalDaysDifference(tries: number, factor: number): number {
        if (tries == 1) {
            return factor;
        }
        return ((tries + 1) * factor) + this.getTotalDaysDifference(tries - 1, factor);
    }

    private findAssetClosestDate(assets: any[], date: Date){
        let timeDiff = null;
        let datePicture = null;

        assets.forEach(asset => {
            const dateAsset = new Date(asset.date);
            const assetTimeDiff = Math.abs(date.getTime() - dateAsset.getTime());
            if(null === timeDiff || timeDiff > assetTimeDiff){
                timeDiff = assetTimeDiff;
                datePicture = asset.date;
            }
        });
        return datePicture;
    }

    private resetAttempts(){
        this.attempt = 0;
    }
}

export class NasaPicture {
    code: string;
    info: string;
    picture: any;
}

export interface NasaServiceObserver {

    onPictureUpdate(picture: NasaPicture);
    onStatusUpdate(status: string, state: boolean);

}
