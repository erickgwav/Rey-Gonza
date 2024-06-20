import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from './location.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

interface Location {
  lat: number;
  lng: number;
  timestamp: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  center: google.maps.LatLngLiteral = { lat: 21.882456, lng: -102.291257 };
  zoom = 13;
  locations: Location[] = [];
  selectedLocation: Location | null = null;
  path: google.maps.LatLngLiteral[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const lat = parseFloat(params['lat']);
      const lng = parseFloat(params['lng']);
      if (!isNaN(lat) && !isNaN(lng)) {
        const timestamp = new Date().toLocaleString();
        const newLocation: Location = { lat, lng, timestamp };
        this.addLocation(newLocation);
        this.updateUrlParams(lat, lng);  // Actualiza la URL sin recargar
      }
    });

    this.loadLocations();
  }

  addLocation(location: Location) {
    this.locationService.addLocation(location).subscribe(() => {
      this.locations.push(location);
      this.updatePath();
    });
  }

  loadLocations() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
      this.updatePath();
    });
  }

  updatePath() {
    this.path = this.locations.map(location => ({
      lat: location.lat,
      lng: location.lng
    }));
  }

  openInfoWindow(marker: MapMarker, location: Location) {
    this.selectedLocation = location;
    this.infoWindow.open(marker);
  }

  private updateUrlParams(lat: number, lng: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { lat: lat, lng: lng },
      queryParamsHandling: 'merge',
      replaceUrl: true  // Reemplaza la URL sin recargar
    });
  }
}
