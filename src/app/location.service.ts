import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Location {
  lat: number;
  lng: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:3000/locations'; // Cambia esta URL según sea necesario

  constructor(private http: HttpClient) { }

  addLocation(location: Location): Observable<any> {
    return this.http.post(this.apiUrl, location);
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }
}
