import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserService } from "app/main/user/user.service";
import { MapService } from 'app/main/map/map.service';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class CanActivateSearch implements CanActivate {
  constructor(private userService: UserService, private router: Router, private mapService: MapService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    var canActivate = this.userService.latitude != undefined && this.userService.longitude != undefined;
    if (!canActivate) {
      return this.initCoordinates();
    }
    return Observable.of(canActivate);
  }

  private initCoordinates(): Observable<boolean> {
    if (document.location.protocol == "https:") {
      return Observable.create((observer: Observer<any>) => navigator.geolocation.getCurrentPosition((position) => {
        this.setCoordinates(position.coords.latitude, position.coords.longitude);
        observer.next(true);
      }, () => {
        this.mapService.getLocation().subscribe(location => {
          this.setCoordinates(location.lat, location.lng);
          observer.next(true);
        });
       
      }));
    } else {
      return Observable.create((observer: Observer<any>) => this.mapService.getLocation().subscribe(location => {
        this.setCoordinates(location.lat, location.lng);
        observer.next(true);
      }));
    }
  }

  private setCoordinates(lat: number, lng: number) {
    this.userService.latitude = lat;
    this.userService.longitude = lng;
  }
}