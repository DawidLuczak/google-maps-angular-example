import { Component } from '@angular/core';
import { CustomGoogleMapsService } from './custom-google-maps.service';
import data from 'src/assets/data.json';
import { Observable, combineLatest, map} from 'rxjs';

@Component({
  selector: 'app-custom-google-maps',
  templateUrl: './custom-google-maps.component.html',
  styleUrls: ['./custom-google-maps.component.css'],
})
export class CustomGoogleMapsComponent {
  private _locationsParameters = data.map((v: any) => `${v.lat}%2C${v.lon}`);
  private _params: string[] = [];

  readonly roadLocations: Observable<any>[];
  readonly roadLocations$: Observable<any>;

  readonly mapOptions: google.maps.MapOptions = {
    center: { lat: data[0].lat, lng: data[0].lon },
    zoom: 12,
  };

  readonly polylineOptions: google.maps.PolylineOptions = {
    strokeWeight: 1,
    strokeColor: 'red',
    strokeOpacity: 1
  };

  constructor(private _customGoogleMapsService: CustomGoogleMapsService) {
    let index = 0;
    while (index < this._locationsParameters.length) {
      this._params.push(this._locationsParameters.slice(index, index + 10).join('%7C'));
      index += 10;
    }
    
    this.roadLocations = this._params.map(
      (params) => this._customGoogleMapsService.getRoads(params)
        .pipe(
          map((data: any) => {
            return data.snappedPoints.map((v: any) => ({ lat: v.location.latitude, lng: v.location.longitude }))
          })
        )
      );

    this.roadLocations$ = combineLatest(...this.roadLocations)  .pipe(map((data) => {
      const x: any[] = [];
      data.forEach((v) => x.push(...v));
      return x;
    }))
  }
}
