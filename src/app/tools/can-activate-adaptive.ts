import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserService } from "app/main/user/user.service";
import { AdaptiveService } from 'app/tools/adaptive.service';

@Injectable()
export class CanActivateAdaptive implements CanActivate {
    constructor(private adaptiveService: AdaptiveService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return this.adaptiveService.isMobile();
    }
}