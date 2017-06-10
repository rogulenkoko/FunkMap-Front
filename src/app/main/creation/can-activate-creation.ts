import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserService } from "app/main/user/user.service";

@Injectable()
export class CanActivateCreation implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        var canActivate = this.userService.user ? true : false;
        if(!canActivate){
            this.router.navigate(['/login']);
        }
        return canActivate;
    }
}