import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

/**
 * Protects the application pages: only users with a valid (non-expired)
 * access token can open them, the others are sent back to the sign-in page.
 */
@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  private readonly jwtHelper = new JwtHelperService();

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem("accessToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    localStorage.removeItem("accessToken");
    return this.router.parseUrl("/");
  }
}
