import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeService } from '../services/home.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard {
  constructor(private _homeService:HomeService, private _router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if(!this._homeService.logIn){
    //   this._router.navigate(['folder/inbox'])
    //   return false;
    // }
      return true;
  }
  
}
