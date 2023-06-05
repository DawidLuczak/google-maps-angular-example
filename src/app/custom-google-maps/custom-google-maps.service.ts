import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomGoogleMapsService {
  private readonly _API_ENDPOINT =
    'https://roads.googleapis.com/v1/snapToRoads';
  private readonly _API_KEY = 'AIzaSyBNzlmMA5EiTGjXI3t3QUICkuM57Me9iCc';

  constructor(private _httpClient: HttpClient) {}

  getRoads(parameters: string) {
    return this._httpClient.get(
      `${this._API_ENDPOINT}?interpolate=true&path=${parameters}&key=${this._API_KEY}`
    );
  }
  
}
